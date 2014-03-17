'use strict';
var through = require('through2'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    compilePistachios = require('pistachio-compiler');

module.exports = function() {
  function compiler(file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      return callback(PluginError('Streaming not supported'));
    }

    var compiled = compilePistachios(String(file.contents)).toString()
    file.contents = new Buffer(compiled);
    this.push(file);
    return callback();
  };

  return through.obj(compiler);
};
