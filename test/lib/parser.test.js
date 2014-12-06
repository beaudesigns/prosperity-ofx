var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var parser = require('../../lib/parser');

describe('Parser', function() {

  describe('#isFile', function() {
    it('returns true for .ofx extension', function() {
      expect(parser.isFile('test.ofx')).to.be.true;
    });

    it('returns true for .qif extension', function() {
      expect(parser.isFile('test.qif')).to.be.true;
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
      var data = new Buffer();
      parser.parse(data, function(error, result){
        expect(error).to.be.null;
        expect(result).to.equal('foo');
        done();
      });
    });

    it('handles files', function(done) {
      parser.parse({}, function(error, result){
        expect(error).to.be.null;
        expect(result).to.equal('foo');
        done();
      });
    });

    it('handles strings', function(done) {
      parser.parse({}, function(error, result){
        expect(error).to.be.null;
        expect(result).to.equal('foo');
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