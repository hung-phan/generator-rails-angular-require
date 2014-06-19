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

  askFor: function () {
  },

  app: function () {
  },

  projectfiles: function () {
  }
});

module.exports = RailsAngularRequireGenerator;
