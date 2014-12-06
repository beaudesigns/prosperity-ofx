var fs = require('fs');
var ofx = require('./ofx');

var isFile = exports.isFile = function(filename){
  return /.ofx$|.qif$/.test(filename);
};

exports.parse = function(data, callback){
  var json;

  if (typeof data === 'Buffer') {
    data = data.toString();
    return ofx.parse(data, callback);
  }
  else if (typeof data === 'String') {
    if ( isFile(data) ) {
      fs.readFile(data, 'utf8', function(err, data) {
          if (err) {
            return callback(err);
          }

          return ofx.parse(data, callback);
      });
    }
    else {
      return ofx.parse(data, callback);
    }
  }
  else {
    return callback(new Error('Invalid input. Expecting buffer or string.'));
  }
};