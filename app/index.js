'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var shell = require('shelljs');

var RailsAngularRequireGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        console.log("Thank for using");
      }
    });
  },

  askForCSSLibrary: function () {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'cssFile',
      message: 'What css library would you like to include?',
      choices: [
        { name: 'SASS Button by Alexwolfe' , value: 'includeButtonCss'   , checked: false },
        { name: 'Animate SCSS'             , value: 'includeAnimateCss'  , checked: false },
        { name: 'Bootstrap font-awesome'   , value: 'includeFontAwesome' , checked: true }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeCSS(css) { return props.cssFile.indexOf(css) !== -1; }

      // CSS
      this.includeButtonCss   = includeCSS('includeButtonCss');
      this.includeAnimateCss  = includeCSS('includeAnimateCss');
      this.includeFontAwesome = includeCSS('includeFontAwesome');

      cb();
    }.bind(this));
  },

  assForTemplateSupport: function() {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'htmlFile',
      message: 'What template support would you like to include?',
      choices: [
        { name: 'HAML' , value: 'includeHaml' , checked: true },
        { name: 'SLIM' , value: 'includeSlim' , checked: true }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeTemplate(template) { return props.htmlFile.indexOf(template) !== -1; }

      // template support
      this.includeHaml = includeTemplate('includeHaml');
      this.includeSlim = includeTemplate('includeSlim');

      cb();
    }.bind(this));
  },

  assForUtility: function() {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'tool',
      message: 'What tool support would you like to include?',
      choices: [
        { name: 'Livereload' , value: 'includeLiveReload' , checked: false }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeTool(tool) { return props.tool.indexOf(tool) !== -1; }

      // template support
      this.includeLiveReload = includeTool('includeLiveReload');

      cb();
    }.bind(this));
  },

  assForJSFile: function() {
    var cb = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'jsFile',
      message: 'What js library would you like to include?',
      choices: [
        { name: 'Lodash.js'                 , value: 'includeLodash'         , checked: false } ,
        { name: 'Angular UI-Bootstrap'      , value: 'includeUIBootstrap'    , checked: false } ,
        { name: 'Angular animate'           , value: 'includeAngularAnimate' , checked: false } ,
        { name: 'Bindonce by Pasvaz'        , value: 'includeBindonce'       , checked: false } ,
        { name: 'Modernizr'                 , value: 'includeModernizr'      , checked: true }
      ]
    }];

    this.prompt(prompts, function (props) {
      function includeJS(js) { return props.jsFile.indexOf(js) !== -1; }

      // JS
      this.includeLodash         = includeJS('includeLodash');
      this.includeUIBootstrap    = includeJS('includeUIBootstrap');
      this.includeAngularAnimate = includeJS('includeAngularAnimate');
      this.includeBindonce       = includeJS('includeBindonce');
      this.includeModernizr      = includeJS('includeModernizr');
      cb();
    }.bind(this));
  },

  processingGemfileTemplate: function() {
    console.log('Processing Gemfile');
    this.template('Gemfile', 'tmp/yeoman/Gemfile');
  },

  gemfile: function() {
    //process Gemfile
    var path   = 'tmp/yeoman/Gemfile',
        dest   = 'Gemfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    //modify file before insert
    file = file.replace("# Use jquery as the JavaScript library\n", '')
               .replace("gem 'jquery-rails'\n", '')
               .replace("# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks\n", '')
               .replace("gem 'turbolinks'\n", '');

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
  },

  bundleInstall: function() {
    shell.exec("bundle install");
  },

  executeBowerTask: function() {
    console.log('Processing Bowerfile');
    shell.exec("rails g bower_rails:initialize");
  },

  processingBowerfileTemplate: function() {
    this.template('Bowerfile', 'tmp/yeoman/Bowerfile');
  },

  bower: function() {
    //process bower
    var path   = 'tmp/yeoman/Bowerfile',
        dest   = 'Bowerfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
  },

  bowerInstall: function() {
    shell.exec("rake bower:install");
  },

  templateSupport: function() {
    console.log('Adding template support: angular_template_assets.rb');
    this.template('config/angular_template_assets.rb', 'config/initializers/angular_template_assets.rb');
  },

  requirejs: function() {
    //requirejs config
    console.log('Requirejs config/requirejs.yml');
    this.template('config/requirejs.yml', 'config/requirejs.yml');
  },

  jasmineInit: function() {
    console.log('Integrate jasmine testing framework');
    shell.exec("rails generate jasmine_rails:install");
  },

  jasmine: function() {
    //process jasmine

    //init template and rooting at localhost:3000/specs
    this.mkdir('spec/javascripts/helpers');
    this.mkdir('spec/javascripts/spec');
    this.copy('jasmine_rails/jasmine.yml', 'spec/javascripts/support/jasmine.yml');
    this.copy('spec/javascripts/spec/homeSpec.coffee', 'spec/javascripts/spec/homeSpec.coffee');
    this.copy('jasmine_rails/spec_helper.rb', 'lib/jasmine_rails/spec_helper.rb');
    this.copy('jasmine_rails/spec_runner.html.erb', 'app/views/layouts/jasmine_rails/spec_runner.html.erb');

    //include config into config/application.rb
    var path   = 'config/application.rb',
        hook   = 'class Application < Rails::Application\n',
        file   = this.readFileAsString(path),
        insert = '    config.autoload_paths += %W(#{config.root}/lib)\n';

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook + insert));
    }
  },

  guard: function() {
    //process livereload
    console.log('Add livereload utility');
    if (this.includeLiveReload) {
      shell.exec("guard init livereload");
    }
  },

  view: function () {
    console.log('Processing view');
    this.copy('view/index.html', 'app/views/application/index.html');
    this.template('view/application.html.erb', 'app/views/layouts/application.html.erb');
  },

  appJs: function() {
    console.log('Processing app js');
    var path   = 'app/assets/javascripts/application.js',
        file   = this.readFileAsString(path);

    //modify file before insert
    file = file.replace("//= require jquery\n", '')
               .replace("//= require jquery_ujs\n", '')
               .replace("//= require turbolinks\n", '')
               .replace("//= require_tree .", '//= require main.js');

    this.write(path, file);
    this.template('app/main.coffee', 'app/assets/javascripts/main.coffee');
    this.directory('app/home', 'app/assets/javascripts/home');
  },

  routes: function() {
    console.log('Processing config/routes.rb');
    var path   = 'config/routes.rb',
        hook   = 'Rails.application.routes.draw do\n',
        file   = this.readFileAsString(path),
        insert = "  root 'application#index'\n";

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, hook + insert));
    }
  },

  stylesheets: function() {
    console.log('Processing app stylesheets');
    var extra  = '';
    if (this.includeButtonCss) {
      extra += " *= require Buttons/scss/buttons.scss\n";
    }
    if (this.includeAnimateCss) {
      extra += " *= require animate-sass/_animate.scss\n";
    }
    var path   = 'app/assets/stylesheets/application.css',
        hook   = ' *= require_tree .\n',
        file   = this.readFileAsString(path),
        insert = ' *= require sass-bootstrap/lib/bootstrap.scss\n' +
                 ' *= require font-awesome/scss/font-awesome.scss\n' +
                 extra +
                 ' *= require_tree .\n';

    if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
    }
  }
});

module.exports = RailsAngularRequireGenerator;
