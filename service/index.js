'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the service subgenerator with the argument ' + this.name + '.');
  this.uppercaseName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
};

util.inherits(ServiceGenerator, yeoman.generators.NamedBase);

ServiceGenerator.prototype.files = function files() {
  // replace between
  function replaceBetween(string, start, end, what) {
    return string.substring(0, start) + what + string.substring(end);
  };

  var prefix = 'app/src/' + this.name + '/';
  this.mkdir(prefix);
  this.template('service-template.js'       , prefix + this.name + '.js');
  this.template('service-template.spec.js'  , prefix + this.name + '.spec.js');

  var configFile = process.cwd() + '/app/src/config.js';
  var name = this.name;
  fs.exists(configFile, function(exists) {
    fs.readFile(configFile, "utf8", function (err, data) {
      if (err) throw err;

      // check for code exist
      var tag = name + '/' + name;
      if (data.indexOf(tag) != -1) return; // already exists tag

      //look for tag to insert code
      var index = data.indexOf('/*--insert code tag--do not remove*/');
      if (index === -1) return;

      //write data to config file
      var config = '/*require ' + name + ' service module*/\n' +
                   '\t\t\'' + name + '\': \'' + name + '/' + name + '\',\n\t\t';
      data = replaceBetween(data, index, index, config);
      fs.writeFile(configFile, data, function(err) {
        if(err) { console.log(err); } else { console.log("The config file was saved!"); }
      });
    });
  });
};
