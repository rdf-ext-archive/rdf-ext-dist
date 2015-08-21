var
  exec = require('child_process').exec,
  fs = require('fs'),
  path = require('path');


var run = function (command) {console.log(command);
  return new Promise(function (resolve, reject) {
    exec(command, function (error, stdout, stderr) {
      if (error != null) {
        return reject(error);
      }

      if (stderr.trim() !== '') {
        console.error(stderr.trim());
      }

      if (stdout.trim() !== '') {
        console.log(stdout.trim());
      }

      resolve();
    });
  });
};

var browserify = function (source, target, options) {
  var cmd = './node_modules/browserify/bin/cmd.js -d ' + source + ' -o ' + target;

  if ('exclude' in options) {
    cmd += ' ' + options.exclude
      .map(function (exclude) {
        return '-u ' + exclude;
      })
      .join(' ');
  }

  if ('noBuiltins' in options && options['noBuiltins']) {
    cmd += ' --no-builtins'
  }

  return run(cmd);
};

var exorcist = function (source, target, options) {
  var cmd = 'cat ' + source + ' | ./node_modules/exorcist/bin/exorcist.js ' + target + ' > /dev/null';

  return run(cmd);
};

var uglify = function (source, target, options) {
  var cmd = './node_modules/uglify-js/bin/uglifyjs ' + source + ' -o ' + target;


  if ('compress' in options && options.compress) {
    cmd += ' --compress';
  }

  if ('inSourceMap' in options) {
    cmd += ' --in-source-map ' + options.inSourceMap;
  }

  if ('sourceMap' in options) {
    cmd += ' --source-map ' + options.sourceMap;
  }

  if ('sourceMapUrl' in options) {
    cmd += ' --source-map-url ' + options.sourceMapUrl;
  }

  return run(cmd);
};


var excludes = [
  fs.realpathSync(path.join(__dirname, 'node_modules/rdf-ext/lib/utils-node.js')),
  fs.realpathSync(path.join(__dirname, 'node_modules/rdf-ext/node_modules/es6-promise/dist/es6-promise.js')),
  fs.realpathSync(path.join(__dirname, 'node_modules/rdf-ext/node_modules/es6-promise/dist/es6-promise.min.js')),
  fs.realpathSync(path.join(__dirname, 'node_modules/rdf-ext/node_modules/xmldom')) + '/**/*.*'
];


browserify('rdf-ext.js', 'dist/rdf-ext.js', { exclude: excludes })
  .then(function () {
    return exorcist('dist/rdf-ext.js', 'dist/rdf-ext.js.map', {});
  })
  .then(function () {
    return uglify('dist/rdf-ext.js', 'dist/rdf-ext.min.js', {
      compress: true,
      inSourceMap: 'dist/rdf-ext.js.map',
      sourceMap: 'dist/rdf-ext.min.js.map',
      sourceMapUrl: 'rdf-ext.min.js.map'
    });
  })
  .catch(function (error) {
    console.error(error.stack);
  });
