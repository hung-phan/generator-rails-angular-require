'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You just create the sub controller with the argument ' + this.name + '. Please link it with your main controller');
  this.uppercaseName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  this.asset_path = '<%= asset_path("' + this.name + '/' + this.name + '.tpl.html") %>';
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
  // replace between
  var prefix = 'app/assets/javascripts/' + this.name + '/';
  this.template('controller-template.coffee.erb'  , prefix + this.name + '.coffee.erb');
  this.template('controller-template.spec.coffee' , 'spec/javascripts/spec/' + this.name + 'Spec.coffee');
  this.template('controller-template.tpl.html'    , prefix + this.name + '.tpl.html');
};
