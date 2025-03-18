---
layout: post
title: "Speeding Up System Tests Part 2: Test Parallelization in RSpec"
date: "2025-03-18"
categories: testing
tags: "ruby rails parallelization rspec"
author: "Andrew D.E. Smith"
---

Part 1 in this series, factory-built fixtures, can be found <a href="{{ "/testing/2025/01/17/fixture-factories.html" | prepend: site.url }}" target="_blank" class="post-link">here</a>.

Today, we'll continue on with part 2 of this series on speeding up system tests, this time by examining test parallelization in RSpec, in the context of a Ruby on Rails application.

Currently, Rails defaults to MiniTest out of the box, and has added support in recent years for <a href="https://guides.rubyonrails.org/testing.html#parallel-testing" target="_blank" class="post-link">running tests in parallel</a>. Unfortunately, RSpec still lacks built-in support for parallel testing. However, there is a fairly popular gem, <a href="https://github.com/grosser/parallel_tests" target="_blank" class="post-link">"parallel tests"</a>, that allows for it.


Below I will point out some of the less obvious steps in setup, including getting this gem to play nicely with Docker. You'll also want to skim the linked gem's documentation.

Once you've installed the gem, you'll want to configure it to work with your database(s). In Rails, it will look like this:

```yml
# sales/config/database.yml
database: sales_test<%= ENV['TEST_ENV_NUMBER'] %>
```

where "TEST_ENV_NUMBER" is an environment variable supplied by the `parallel_tests` gem. For this article, I'll be using "sales" as the name of the application.

Next, create the parallel databases and load data into them:

```bash
# From within your application's directory.
bundle exec rake parallel:create
bundle exec rake parallel:load_schema
```

You should then see a number of `sales_test` databases, equal to the threads on your computer's processors. E.g., a 10 core, 16 thread machine should give you 16 each of the databases (`sales_test`, `sales_test2`, `sales_test3`, ...). A database visualization tool can be helpful here.

Next, you'll want to let your application know that it should be looking at multiple ports. Capybara is the standard tool used for Rails system tests. Configuration looks something like this:

```ruby
# Determine whether the tests are being run in parallel.
Capybara.server_port = ENV['TEST_ENV_NUMBER'] ? (6000 + ENV['TEST_ENV_NUMBER'].to_i) : '6000'
```

You may also desire the ability to examine output log files from parallel test runs. Configuration follows:

```ruby
# sales/.rspec_parallel
--require spec_helper
--color
--format documentation
--format ParallelTests::RSpec::VerboseLogger
--format ParallelTests::RSpec::RuntimeLogger --out tmp/parallel_runtime_rspec.log
--format ParallelTests::RSpec::SummaryLogger --out tmp/spec_summary.log
--format ParallelTests::RSpec::FailuresLogger --out tmp/failing_specs.log
```

Now to run the tests:

```bash
RAILS_ENV=test bundle exec rake 'parallel:spec[-o -f ParallelTests::RSpec::VerboseLogger]'
```

You'll get output in this format:

```bash
# From https://github.com/grosser/parallel_tests?tab=readme-ov-file#rspec-verboselogger
# PID, parallel process number, spec status, example description
[14403] [2] [STARTED] Foo foo
[14402] [1] [STARTED] Bar bar
[14402] [1] [PASSED] Bar bar
```

You can see all valid options for the `parallel` rake task by running:

```bash
bundle exec rake "parallel:spec[--help]"
```

For example, you can also pass in the `[-o -f doc]` option for parallel test output formatting if you prefer, though I find it a bit hard to parse.

Finally, if using Docker and Docker Compose, you'll want to specify the mapping for all of the ports:

```yml
# docker-compose-sales-parallel.yml
...
services:
  sales:
    ...
    ports:
      - "6000:6000"
      - "6001:6001"
      - "6002:6002"
      - ...
    ...
```

Then you can run the Dockerized tests in parallel using the following commands:

```bash
docker-compose -f ../docker-compose-sales-parallel.yml exec sales bundle exec rake parallel:create
docker-compose -f ../docker-compose-sales-parallel.yml exec sales bundle exec rake parallel:load_schema
docker-compose -f ../docker-compose-sales-parallel.yml exec sales bundle exec rake 'parallel:spec[-o -f ParallelTests::RSpec::VerboseLogger]'
```

You may notice a number of additional failing tests, in comparison to running them single-thread. Parallelization appears to magnify any flakiness already present in tests. One mitigation for this increased flakiness is to retry failing tests a certain number of times. The <a href="https://github.com/NoRedInk/rspec-retry" target="_blank" class="post-link">rspec-retry gem</a> can be a big help in this regard. I've gotten pretty good results with a setting of 3 maximum test failures, but other people may need to tweak this to different values.

```ruby
# /spec/spec_helper.rb
config.default_retry_count = 3
```

The test threads are grouped by spec file, so a handful of slow running spec files will be your bottleneck for speed. If possible, split up large, slow running spec files to gain further peformance improvements.