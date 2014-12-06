var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var builder = new xml2js.Builder();

var hasClosingTags = exports.hasClosingTags = function() {

};

var ofxToXML = exports.ofxToXML = function(data) {

};

exports.xmlToJS = parser.parseString;

exports.parse = function(data, callback) {
  var data = {};
  var callback = fn;
  var ofxRes = ofxStr.split('<OFX>',2);
  var ofx = '<OFX>' + ofxRes[1];
  var headerString = ofxRes[0].split(/\r|\n/);

  data.xml = ofx
              .replace(/>\s+</g, '><')
              .replace(/\s+</g, '<')
              .replace(/>\s+/g, '>')
              .replace(/<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)/g, '<\$1\$2>\$3' )
              .replace(/<(\w+?)>([^<]+)/g, '<\$1>\$2</\$1>');

  try {
    data.body = JSON.parse(xml2json.toJson(ofx));
  } catch(e) {
    data.body = JSON.parse(xml2json.toJson(data.xml));
  }

  data.header = {};

  for(var key in headerString){
    var headAttributes = headerString[key].split(/:/,2);
    if (headAttributes[0]) data.header[headAttributes[0]] = headAttributes[1];
  }
  fn(data);
};

exports.encode = function(data, callback) {

};