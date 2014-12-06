var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var parser = require('../../lib/parser');

describe('Parser', function() {

  describe('#isFile', function() {
    it('returns true for .ofx extension', function() {
      expect(parser.isFile('test.ofx')).to.be.true;
    });

    it('returns true for .qfx extension', function() {
      expect(parser.isFile('test.qfx')).to.be.true;
    });

    it('returns false when no valid extension is found', function() {
      expect(parser.isFile('not a filename')).to.be.false;
    });
  });

  describe('#parse', function() {
    it('returns an error for invalid input', function(done) {
      parser.parse({}, function(error){
        expect(error.message).to.equal('Invalid input. Expecting buffer or string.');
        done();
      });
    });

    it('handles buffers', function(done) {
      var data = new Buffer('OFXHEADER:100\rDATA:OFXSGML\rVERSION:102');
      parser.parse(data, function(error, result){
        expect(error).to.be.null;
        expect(result).to.not.be.undefined;
        done();
      });
    });

    it('handles files', function(done) {
      var filename = path.resolve(__dirname, '../fixtures', 'sample-statement.ofx');
      parser.parse(filename, function(error, result){
        expect(error).to.be.null;
        expect(result).to.not.be.undefined;
        done();
      });
    });

    it('handles strings', function(done) {
      parser.parse('OFXHEADER:100\rDATA:OFXSGML\rVERSION:102', function(error, result){
        expect(error).to.be.null;
        expect(result).to.not.be.undefined;
        done();
      });
    });

    it('returns error when file not found', function(done) {
      parser.parse('not-found.ofx', function(error, result){
        expect(error).to.be.ok;
        expect(result).to.be.undefined;
        done();
      });
    });

    it('returns parse errors', function(done) {
      parser.parse('foo', function(error){
        expect(error).to.be.ok;
        done();
      });
    });
  });
});