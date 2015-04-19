# generator-rails-angular-require

> [Yeoman](http://yeoman.io) generator

[![NPM](https://nodei.co/npm/generator-rails-angular-require.png?downloads=true)](https://nodei.co/npm/generator-rails-angular-require/)

## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
```

To install generator-rails-angular-require from npm, run:

```bash
$ npm install -g generator-rails-angular-require
```

To be able to support template preprocessor, make sure you install the right `gem` first:

```bash
$ gem install slim # for slim
$ gem install haml # for haml
```
Other dependencies

1. SASS (gem install sass)

2. Compass (gem install compass)


## Usage for Rails 4.*

Firstly, create Ruby on Rails project with normal rails command, but skip it bundle:

```bash
$ rails new app-name --skip-bundle
```

Finally, initiate the generator:

```bash
$ cd app-name
$ yo rails-angular-require
```

Answer 'Yes' to all 'Overwrite' actions. Then config the 'config/database.yml' if you use different
database than sqlite3.

## Assets compile

Compile your assets before deploying to production server

```bash
$ rake assets:precompile RAILS_ENV=production
```

## Options

Name: mongoid (for mongodb)

add `--skip-active-record` option to your `rails new app --skip-active-record` command before selecting this option.

## Template

I define all the templates with suffix __.tpl.*__ to load those into __$templateCache__, which make them testable
with directives that rely on partial template. However, this is configurable by setting in `lib/jasmine_rails/spec_helper.rb`.

## Task

### Live reload

For using livereload utility, firstly, install [guard](https://github.com/guard/guard-livereload). Then, use [rack-livereload](https://github.com/johnbintz/rack-livereload)
or install [LiveReload Safari/Chrome extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

```bash
$ bundle exec guard # to run the guard server and enjoy coding
```

### Testing

Run:

```bash
$ rails server
```

For unit testing, access `localhost:3000/specs`

For e2e testing, run:

```bash
$ protractor protractor.config.js
```

### Subgenerators

This also supports for subgenerator for `controller`, `filter`, `service`, and `directive` as well. Make sure you link them in your
__main.js__
```bash
$ yo rails-angular-require:controller "name" #replace the name with your module name
$ yo rails-angular-require:service "name" #replace the name with your module name
$ yo rails-angular-require:directive "name" #replace the name with your module name
$ yo rails-angular-require:filter "name" #replace the name with your module name

```
## Structure

```
application/
  |- app/
  |  |- apis/
  |  |  |- v1/
  |  |  |  |- base.rb
  |  |  |  |- person_api.rb
  |  |  |- base.rb
  |  |- assets/
  |  |  |- images/
  |  |  |- javascripts/
  |  |  |  |- <codeModule>/
  |  |  |  |  |- codeModule.tpl.html # also support other templates like haml, and slim
  |  |  |  |  |- codeModule.js.coffee
  |  |  |  |- application.js
  |  |  |  |- main.js.coffee # main file
  |  |  |- stylesheets/
  |  |  |  |- application.css
  |  |- controllers/
  |  |- helpers/
  |  |- mailers/
  |  |- models/
  |  |- views/
  |  |  |- application/
  |  |  |  |- index.html # default template navigation by angular-ui-router
  |  |  |- layouts/
  |  |  |  |- jasmine_rails/
  |  |  |  |  |- spec_runner.html.erb # jasmine spec runner template
  |  |  |  |- application.html.erb
  |- bin/
  |- config/
  |  |- initializers/
  |  |  |- angular_template_assets.rb # Add template support
  |  |  |- bower_rails.rb # bower rails config
  |  |- requirejs.yml # requirejs config file
  |- db/
  |- lib/
  |  |- jasmine_rails/
  |  |  |- spec_helper.rb # jasmine rails helper
  |- log/
  |- public/
  |- spec/
  |  |- javascripts/
  |  |  |- helpers/
  |  |  |- e2espec/
  |  |  |  |- codeSpec.{js, coffee} # suffix by _e2espec.{js, coffee}
  |  |  |- spec/
  |  |  |  |- codeSpec.{js, coffee} # suffix by _unitspec.{js, coffee}
  |  |  |- support/
  |  |  |  |- jasmine.yml # jasmine config
  |- test/
  |- tmp/
  |- vendor/
  |  |- assets/
  |  |  |- bower_components/
  |  |  |  |- third libararies/
  |- |  |- bower.json
  |- Bowerfile # define all bower_components here
  |- config.ru
  |- Gemfile
  |- Gemfile.lock
  |- Guardfile # Guard file for livereload
  |- Rakefile
  |- README.rdoc
```

## Contribution
All contributions are welcomed.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
