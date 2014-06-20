# generator-rails-angular-require

> [Yeoman](http://yeoman.io) generator


## Getting Started

To run this version of yeoman generator. First, make sure that you have already installed yeoman

```bash
$ npm install -g yo
```

To install generator-angular-with-require from npm, run:

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

Also add additional params to specify the database, which you want to use:
```bash
$ rails new app-name --database=postgresql --skip-bundle
$ rails new app-name --database=mysql --skip-bundle
```
Finally, initiate the generator:

```bash
$ yo rails-angular-require
```

Answer 'Yes', to all resolving 'Overwrite' action. Then config the 'config/database.yml' if you use different
database than sqlite3.

## Structure

```
application/
  |- app/
  |  |- assets/
  |  |  |- images/
  |  |  |- javascripts/
  |  |  |  |- <codeModule>/
  |  |  |  |  |- codeModule.html # also support other templates like haml
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
  |- log/
  |- public/
  |- spec/
  |  |- javascripts/
  |  |  |- helpers/
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

## Task

### Live reload

To be able to use livereload utility, I use [guard](https://github.com/guard/guard-livereload) to automatically
reload the browser. Use [rack-livereload](https://github.com/johnbintz/rack-livereload) or install [LiveReload Safari/Chrome extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-)

```bash
$ bundle exec guard
```

### Testing
After run:

```bash
$ rails server
```

Access `localhost:3000/specs`

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
