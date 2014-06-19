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
        { name: 'Jasmine Testing framework' , value: 'includeJasmine'        , checked: true }  ,
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
      this.includeJasmine        = includeJS('includeJasmine');
      this.includeModernizr      = includeJS('includeModernizr');

      if (this.includeJasmine) { this.testFramework = 'jasmine'; }

      cb();
    }.bind(this));
  },

  app: function () {
  },

  projectfiles: function () {
  }
});

module.exports = RailsAngularRequireGenerator;
