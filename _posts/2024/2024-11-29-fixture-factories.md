---
layout: post
title: "Speeding Up System Tests Part 1: Factory-Built Fixtures"
date: "2024-11-29"
categories: testing
tags: "ruby rails fixtures factories"
author: "Andrew D.E. Smith"
---

Over the past few months, I've been working part-time on an overhaul of the RSpec test suites belonging to two mid-sized Ruby on Rails applications. Both possess a few hundred system tests, with nearly no existing unit tests. The system tests are great for regression testing and getting to understand how these applications are supposed to work.

The problem was that these test suites were <i>SLOW</i>. It took over two hours to run both test suites on my mid-range 2022 desktop.

After some research and discussion, I first looked to the smaller and simpler of the two applications, using it as a testbed for the application of several tools and techniques to greatly speed up and increase the test suites' maintainability. The three techniques to test suite speed up have been: (1) Converting all test data to factory-built fixtures. (2) Parallelization of the tests, both inside and outside of a continuous integration environment. (3) Decoupling from other connected databases, both via pre-built fixtures and via pre-recorded server calls. So far these tools have consisted mainly of <a class="post-link" href="https://github.com/rdy/fixture_builder" target="_blank">fixture_builder</a>, <a class="post-link" href="https://github.com/grosser/parallel_tests" target="_blank">parallel_tests</a>, and <a class="post-link" href="https://github.com/vcr/vcr" target="_blank">vcr</a>. I'll get to the latter two tools in other posts, but this post will be discussing the `fixture_builder` gem.

First, some background.

A key aspect of any test suite is the test data. Two of the most common approaches to test data creation are fixtures and factories.

**Fixtures** are the default out of the box option for Rails, and are what I found in the smaller applications's test suite.  They are very fast, but can be difficult to maintain and reason about as an application grows larger and more complex.

Here are two associated fixtures:

```yml
# users.yml
AcmeDirector:
  id: 9
  client_id: 127
  role: director
  first_name: John
  email: nonadmin@acme.com
  encrypted_password: <%= Devise::Encryptor.digest(User, 'pass123') %>

# clients.yml
AcmePlace:
  id: 127
  name: "Acme Inc."
  ...
```

This doesn't look too bad. It's a bit annoying to have to link them up via numerical ID, but it's certainly manageable.

What about more complex situations, such as join tables, whose tables in turn have their own associated tables?

```yml
# offer_availability.yml
PageDraftOffer:
  offer_id: 7
  sale_page_id: 13

# offer.yml
offerdraft:
  id: 7
  client_id: 127
  title: "Offer Draft"
  ...

# sale_pages.yml
PageWithUrl:
  id: 13
  client_id: 127
  name: 'PageWithUrl'
  ...

# clients.yml
AcmePlace:
  id: 127
  name: "Acme Inc."
  ...
```

Now developers have to hunt back and forth across at least four fixture files, matching by numerical IDs that otherwise have no logical meaning. If they require a variant of one of these fixtures, they need to create an entirely new fixture and wire up its associations, or tweak it with a database call during a test run.

It certainly wasn't impossible to reason about these fixtures in their current state, but it was going to gradually become more painful to deal with this test data as the application grew in size and as new associations were added.

Meanwhile, the larger application's test suite used mostly direct object creation using the ActiveRecord ORM, and involved frequent switching back and forth with connections to different application databases. This also required on-the-fly creation of all associated objects during each test run, further slowing down the suite.

Here is a common pattern for running a single system test in the larger application, using Capybara, RSpec, and the `database cleaner` gem:

```ruby
  # specs/system/sale_view_spec.rb
  before(:all) do
    clean_databases # Potentially slows down the tests, depending on configuration.
  end

  sale_page_options = {
    ...
    # A nested hash.
  }

  before_do
    create_sale_pages(sale_page_options)
    seed_with_data_from_yet_another_database(sale_page_options)
    switch_db_to_sales
    navigate_to_...
  end

  context "when ..." do

    let!(:details) {
      create_sale(@associated_object_1, @associated_object2, "details").update({
        ...
      })
    }

    scenario "..." do
      Category.first.update(...)
      ...
      find(...)
    end
  end

  # spec/support/sale_page_creator.rb
  def create_sale_pages(sale_page_options)
    switch_db_to_sales # This will be slow, and introduces lots of coupling to the test suite!
    attrs = {
      title: ...,
      ...
    }
    attrs = attrs.merge(...)
    sale = sales_page.sale.create!(attrs)
    # More child table creation follows.
  end

```

Other specs had even more on-the-fly object creation and/or updates, often squirrelled away in custom support modules, but hopefully readers get the general idea.

While it definitely would have been viable to leave the smaller application's fixtures in place and convert over the larger app's custom test objects to speedy fixtures, I decided that I wanted a more maintainable approach. Consistentcy across the two applications was also a must.

**Factories** are the primary alternative to fixtures used in the Ruby ecosystem, with <a class="post-link" href="https://github.com/thoughtbot/factory_bot" target="_blank">factory_bot</a> and <a class="post-link" href="https://fabricationgem.org/" target="_blank">fabrication</a> being the two most popular gems used to facilitate Ruby object generation. While certainly cleaner and more consistent than most hand-crafted Ruby test object generation, the same problem with performance remains.

That's when I came across the <a class="post-link" href="https://github.com/rdy/fixture_builder" target="_blank">fixture_builder</a> gem, which allows for the use of factories to create a set of fixtures. This is best shown with an example:

```ruby
# spec/support/fixture_builder.rb
  acme_client = name(
    :acme_client,
    FactoryBot.create(:acme_client)
  ).first

  ...

  name(:super_admin_user_with_acme_client,
    FactoryBot.create(
      :superadmin_user,
      :without_validations,
      client_id: acme_client.id # Now we can use meaningful names when wiring up associations!
    )
  )


# spec/factories/client.rb
factory :acme_client do
  name { "Acme Inc." }
  ...
end


# spec/factories/user.rb
  factory :superadmin_user do
    role { "superadmin" }
  end


# spec/system/_.rb
(Use a before and after example with these simple fixtures here.)
```

(Talk about the simple example above).

Here's a more complex example, making full use of Factory Bot's traits, which is where this approach really starts to shine:

```ruby
# spec/support/fixture_builder.rb
sale_active = name(:sale_active,
      # Factory invocation that uses multiple traits.
      FactoryBot.create(
        :sale_active,
        :live_aasm_state,
        :online,
        ...
        :targeted,
        client_id: game_place_client.id
      )
).first

category_with_acme_client_with_earings_name = name(:category_with_acme_client_with_earings_name,
  FactoryBot.create(
    :category,
    :with_earings_name,
    client_id: acme_client.id
  )
).first

# A join table. Much nicer than using numerical IDs.
sale_categorization_visible_active_sale = name(:sale_categorization_visible_active_sale,
  FactoryBot.create(
    :sale_categorization,
    sale_id: sale_active.id,
    category_id: category_with_acme_client_with_earings_name.id
  )
).first


# spec/support/sales.rb
factory :offer do
  ...

  trait :live_aasm_state do
    aasm_state { "live" }
  end

  trait :online do
    is_online { true }
  end

  # You can use traits within other traits!
  trait :targeted do
    live_aasm_state
    save_now_coupon_tile
    summer_code
    online
    expiration_date { 2.days.from_now }
    after :create do |s_targeting|
      s_targeting.updated_at = 1.day.ago
      s_targeting.save!
    end
  end

  ...

  # Child factory of offer.
  factory :sale_active do
    title { "Sale Active" }
    code { "draft king" }
    expiration_date { 1.hour.from_now }
  end
```

# spec/system/_.rb
(Use a before and after example of the fixtures in system test here)
