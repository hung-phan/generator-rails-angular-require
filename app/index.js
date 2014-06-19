'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var RailsAngularRequireGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      if (!this.options['skip-install']) {
        //rails generate jasmine_rails:install
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

  gemfile: function() {
    //process Gemfile
    this.template('Gemfile', 'tmp/yeoman/Gemfile');
    var path   = 'tmp/yeoman/Gemfile',
        dest   = 'Gemfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    //modify file before insert
    file = file.replace("# Use jquery as the JavaScript library\n", '')
               .replace("gem 'jquery-rails'", '')
               .replace("# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks", '')
               .replace("gem 'turbolinks'", '');

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
    this.spawnCommand('bundle', ['install']);
  },

  bower: function() {
    //process bower
    this.spawnCommand('rails', ['generate', 'bower_rails:initialize']);
    this.template('Bowerfile', 'tmp/yeoman/Bowerfile');
    var path   = 'tmp/yeoman/Bowerfile',
        dest   = 'Bowerfile',
        file   = this.readFileAsString(dest),
        insert = this.readFileAsString(path);

    if (file.indexOf(insert) === -1) {
      this.write(dest, file + insert);
    }
  },

  app: function () {
    this.template('config/angular_template_assets.rb', 'config/initializers/angular_template_assets.rb');
    this.template('config/requirejs.yml', 'config/requirejs.yml');
    this.copy('jasmine_rails/spec_helper.rb', 'lib/jasmine_rails/spec_helper.rb');
    this.copy('jasmine_rails/spec_runner.html.erb', 'app/views/layouts/jasmine_rails/spec_runner.html.erb');
    this.copy('view/index.html', 'app/views/application/index.html');
    this.template('view/application.html.erb', 'app/views/layouts/application.html.erb');
  }
});

module.exports = RailsAngularRequireGenerator;
