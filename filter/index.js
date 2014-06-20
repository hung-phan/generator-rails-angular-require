'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the filter subgenerator with the argument ' + this.name + '.');
};

util.inherits(FilterGenerator, yeoman.generators.NamedBase);

FilterGenerator.prototype.files = function files() {
  var prefix = 'app/assets/javascripts/' + this.name + '/';
  this.template('filter-template.coffee'  , prefix + this.name + '.coffee');
  this.template('filter-template.spec.coffee' , 'spec/javascripts/spec/' + this.name + '_unitspec.coffee');
};
