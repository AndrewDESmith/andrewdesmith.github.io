---
layout: post
title: "Speeding Up System Tests Part 1: Factory-Built Fixtures"
date: "2025-01-10"
categories: testing
tags: "ruby rails fixtures factories"
author: "Andrew D.E. Smith"
---

Over the past few months, I've been working part-time on an overhaul of the RSpec test suites belonging to two mid-sized Ruby on Rails applications. Both possess a few hundred system tests, with nearly no existing unit tests. The system tests are great for regression testing and getting to understand how these applications are supposed to work.

The problem was that these test suites were <i>SLOW</i>. It took over two hours to run both test suites on my mid-range 2022 desktop PC.

The larger of the two test suites takes almost two hours for a full run. Beyond Selenium and Capybara often waiting around for the browser to retrieve data from another application, there is a ton of ActiveRecord object creation and <a class="post-link" href="https://github.com/DatabaseCleaner/database_cleaner" target="_blank">database cleaning steps</a> with a typical system test, as there is frequent switching back and forth between two databases during data setup.

After some research and discussion, I first looked to the smaller and simpler of the two applications, using it as a testbed for the application of several tools and techniques to greatly speed up and increase the test suites' maintainability. The three techniques for test suite speed up have been:
<br/>
<br/>
(1) Converting all test data to factory-built fixtures.
<br/>
(2) Parallelization of the tests, both inside and outside of a continuous integration environment.
<br/>
(3) Decoupling from other connected databases, both via pre-built fixtures and via pre-recorded responses.
<br/>
<br/>
So far these tools have consisted mainly of the <a class="post-link" href="https://github.com/rdy/fixture_builder" target="_blank">fixture_builder</a>, <a class="post-link" href="https://github.com/grosser/parallel_tests" target="_blank">parallel_tests</a>, and <a class="post-link" href="https://github.com/vcr/vcr" target="_blank">vcr</a> gems. I'll get to the latter two tools in other posts, but this post will be discussing the `fixture_builder` gem.

First, some brief background discussion.

A key aspect of any test suite is the test data. Two of the most common approaches to test data creation are fixtures and factories.

**Fixtures** are the default out of the box option for Rails, and are what I found in the smaller applications's test suite.  They are very fast, but can be difficult to maintain and reason about as an application grows larger and more complex.

Here are two associated example fixtures, similar to those that I inherited in the smaller application:

<br/>
{% highlight yml %}
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
{% endhighlight %}
<br/>

This doesn't look too bad. It's a bit annoying to have to link them up via numerical ID, but it's certainly manageable.

What about more complex situations, such as join tables, whose tables in turn have their own associated tables?

<br/>
{% highlight yml %}
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
{% endhighlight %}
<br/>

Now developers have to hunt back and forth across at least four fixture files, matching by numerical IDs that otherwise have no logical meaning. If they require a variant of one of these fixtures, they need to create an entirely new fixture and wire up its associations, or tweak it with a database call during a test run.

It definitely wasn't impossible to reason about these fixtures in their current state, but it was going to gradually become more painful to deal with this test data as the application grew in size and as new associations were added.

As mentioned above, the larger application's test suite used mostly direct object creation using the ActiveRecord ORM, and involved frequent switching back and forth with connections to different application databases. Here is a common pattern for running a single system test in the larger application, using Capybara, RSpec, and the <a class="post-link" href="https://github.com/DatabaseCleaner/database_cleaner" target="_blank">database cleaner</a> gem:

<br/>
{% highlight ruby %}
require 'rails_helper'

# I've moderately obfuscated the code here, to protect client privacy.
RSpec.feature "Sale Views E2E", type: :feature do
  # spec/system/sale_view_spec.rb
  sale_page_options = {
    name: "A cool sale",
    template: "top",
    ...
  }

  before(:each) do
    clean_databases # Potentially greatly slows down the tests, depending on configuration.
    create_sale_pages(sale_page_options)
  end

  context 'Small (30px) Sale View' do
    before(:each) do
      add_sale_page_to_other_database
    end

    scenario 'Sale View Tab CTA font-size should be small' do
      navigate_to_client_page
      visit '/?small_sale_view'

      within_frame(0) do
        expect(page).to have_css('.sm-tab')
      end
    end
  end

  # ...other tests follow.
end


# spec/support/sale_page_creator.rb
def create_sale_pages(sale_page_options)
  switch_db_to_sales
  @client = Client.create(...)
  options = { ... }
  options.merge!() if ...
  @sale_page = @client.sale_pages.first
  @sale_page.update(options)
  # Child table creation follows.
  create_sale(@client, @sale_page, ...) unless ...
end

def create_sale(...)
  switch_db_to_sales
  attrs = {
    title: ...,
    ...
  }
  attrs = attrs.merge(...) if title
  @sale = sales_page.sale.create!(attrs)
  # Child table and join table creation follows.
  ...
end

def add_sale_page_to_other_database
  switch_db_to_other_database
  DatabaseCleaner.clean  # Another potentially slow step.
  site = Site.new(
    name: ...,
    ...
  )
  site.save!
  options = {
    ...
  }
  dom_transformation = DomTransformation.new(
    ...
  )
  dom_transformation.save!
  integration_page = Page.new(
    token: @sale_page.token,
    ...
  )
  integration_page.save!
end
{% endhighlight %}
<br/>

Some other system specs had even more on-the-fly object creation and updates, often squirrelled away in custom support modules.

While it definitely would have been viable to leave the smaller application's fixtures in place and convert over the larger app's custom test objects to manual fixtures, I decided that I wanted a more maintainable approach. Consistentcy across the two applications was also a must.

**Factories** are the primary alternative to fixtures used in the Ruby ecosystem, with <a class="post-link" href="https://github.com/thoughtbot/factory_bot" target="_blank">factory_bot</a> and <a class="post-link" href="https://fabricationgem.org/" target="_blank">fabrication</a> being the two most popular gems used to facilitate Ruby object generation. While certainly cleaner and more consistent than most hand-crafted Ruby test object generation, the same problem with performance remains.

That's when I came across the <a class="post-link" href="https://github.com/rdy/fixture_builder" target="_blank">fixture_builder</a> gem, which allows for the use of factories to create a set of fixtures. The fixture builder file is a blueprint, invoked as a rake task, that outputs standard YAML fixture files. This is best shown with examples. First, a fairly simple one:

<br/>
{% highlight ruby %}
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
    client_id: acme_client.id
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
  sequence(:email) { |n| "user#{n}.name@email.com" }
  encrypted_password { Devise::Encryptor.digest(User, "pass123") }
  password { "pass123" }

  trait :without_validations do
    to_create { |instance| instance.save(validate: false) }
  end
end
{% endhighlight %}
<br/>

In the `fixture_builder` file above, we use the `:acme_client` factory to create a fixture with the same name. We then use that fixture to supply the `client_id` field to make the `:super_admin_user_with_acme_client` fixture from the `:superadmin_user` factory. In this case, we're skipping creation validations to duplicate what was previously achieved with regular fixtures.

Now, here's a more complex example, making full use of Factory Bot's <a class="post-link" href="https://github.com/thoughtbot/factory_bot/blob/main/GETTING_STARTED.md#traits" target="_blank">traits</a>, which is where this approach really starts to shine. Pay attention to the `:sale_active` fixture:

<br/>
{% highlight ruby %}
# spec/support/fixture_builder.rb
acme_client = name(
  :acme_client,
  FactoryBot.create(:acme_client)
).first

...

sale_active = name(:sale_active,
  FactoryBot.create(
    :sale_active,
    :targeted, # A trait containing other traits.
    client_id: acme_client.id
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


# spec/factories/sales.rb
factory :offer do
  ...

  trait :live_aasm_state do
    aasm_state { "live" }
  end

  trait :online do
    is_online { true }
  end

  trait ...

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

  # Child factory of offer. This can make us of all traits defined above in the parent offer factory.
  factory :sale_active do
    title { "Sale Active" }
    code { "draft king" }
    expiration_date { 1.hour.from_now }
  end
end


# spec/factories/client.rb
factory :acme_client do
  name { "Acme Inc." }
  ...
end
{% endhighlight %}
<br/>

We have hundreds of `offers` fixtures currently generated from our fixture builder file. The use of composable factory traits makes it much easier to create offers with varied attributes in a more semantically meaningful and less tedious way in comparison to manually created fixture files.

I've thought about modularizing the fixture builder file by model class, but I frankly really enjoy being able to hit `Ctrl+F` and search within a single file for very specific fixture names when constructing lots of fixture join tables and child tables.

As an aside, we use the <a class="post-link" href="https://github.com/travisjeffery/timecop" target=_blank>Timecop</a> gem to allow us to set a consistent value for the current date time within the test environment (e.g., January 1 2000 00:00:00 at start of a test suite run). This means that rebuilt fixtures will always have the same date time values, and we can use relative dates and times (e.g., updated_at { 1.day.ago }) in our factories, fixture builder file, and tests without issue.

Remember that earlier `sale_view` system spec above?  With our factory built fixtures, we can now avoid nested ActiveRecord object creation, switching back and forth between two databases, and database cleaning runs, all within each test! This greatly simplifies our system test, speeds it up a lot, and opens the door for easier future test parallelization:

<br/>
{% highlight ruby %}
# spec/system/sale_view_spec.rb
require 'rails_helper'

RSpec.feature "Sale Views E2E", type: :feature do
  context "All Sale Views" do
    # A helper method to allow a developer to view all fixtures across multiple databases.
    grant_access_to_all_fixture_objects

    context 'Small (30px) Sale View' do
      scenario 'Sale View Tab CTA font-size should be small' do
        navigate_to_client_page
        visit '/?small_sale_view'

        within_frame(0) do
          expect(page).to have_css('.sm-tab')
        end
      end
    end

    # Other tests follow...
  end
end
{% endhighlight %}
<br/>

That's it! We no longer need those helper methods, since we are now working with fixtures.  Admittedly the fixture construction does take time and care, and retains some of the complexity of the old approach.  However, the end result will be a much more performant test suite, once this work is complete.

As of this posting, the smaller application has been successfully transistioned over to factory fixtures. Along with parallelization and pre-recorded HTTP responses from other servers, test suite run time was decreased from 19 minutes to 5 minutes on my desktop PC. I'm optimistic that the larger application will see even larger gains once work on it is complete.