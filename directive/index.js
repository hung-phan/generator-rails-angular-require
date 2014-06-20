'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the directive subgenerator with the argument ' + this.name + '.');
  this.uppercaseName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  this.asset_path = '<%= asset_path("' + this.name + '/' + this.name + '.tpl.html") %>';
};

util.inherits(DirectiveGenerator, yeoman.generators.NamedBase);

DirectiveGenerator.prototype.files = function files() {
  var prefix = 'app/assets/javascripts/' + this.name + '/';
  this.template('directive-template.coffee.erb'  , prefix + this.name + '.coffee.erb');
  this.template('directive-template.spec.coffee' , 'spec/javascripts/spec/' + this.name + '_unitspec.coffee');
  this.template('directive-template.tpl.html'    , prefix + this.name + '.tpl.html');
};
