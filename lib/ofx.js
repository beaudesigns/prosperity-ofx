var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

var hasClosingTags = exports.hasClosingTags = function(xml) {

};

var parseOfxHeader = exports.parseOfxHeader = function(header) {
  var response = {};

  for (var key in header) {
    var attributes = header[key].split(/:/,2);
    
    if (attributes[0]) {
      response[attributes[0]] = attributes[1];
    }
  }

  return response;
};

var ofxToXML = exports.ofxToXML = function(ofx) {
  var xml = ofx.replace(/>\s+</g, '><')
               .replace(/\s+</g, '<')
               .replace(/>\s+/g, '>')
               .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<\$1\$2>\$3' )
               .replace(/<(\w+?)>([^<]+)/g, '<\$1>\$2</\$1>');

  return xml;
};

exports.xmlToJS = parser.parseString;

exports.parse = function(data, callback) {
  var ofxData = data.split('<OFX>',2);
  var ofx = '<OFX>' + ofxData[1];
  var header = ofx[0].split(/\r|\n/);
  var response = {};

  response.header = parseOfxHeader(header);

  parser.parseString(ofx, function(error, object){
    if (error) {
      parser.parseString(ofxToXML(ofx), function(error, object){
        if (error) {
          return callback(error);
        }

        response.body = object;
        return callback(null, response);
      });
    }
    else {
      response.body = object;
      return callback(null, response);
    }
  });
};

exports.encode = function(data, callback) {

};