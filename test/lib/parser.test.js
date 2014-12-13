var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var parser = require('../../lib/parser');
var FIXTURE_PATH = path.join(__dirname, '../fixtures/v1.0.2');

var loadFixture = function(fixtures, name, filename) {  
  var data = fs.readFileSync(filename, 'utf-8');
  fixtures[name] = data.toString();
};

describe('Parser', function() {

  before(function(){
    this.fixtures = {};
    loadFixture(this.fixtures, 'sampleStatementOFX', path.resolve(FIXTURE_PATH, 'sample-statement.ofx'));
  });

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
      var data = new Buffer(this.fixtures.sampleStatementOFX);

      parser.parse(data, function(error, result){
        expect(error).to.be.null;
        expect(result).to.not.be.undefined;
        done();
      });
    });

    it('handles files', function(done) {
      var filename = path.resolve(__dirname, '../fixtures/v1.0.2', 'sample-statement.ofx');
      parser.parse(filename, function(error, result){
        expect(error).to.be.null;
        expect(result).to.not.be.undefined;
        done();
      });
    });

    it('handles strings', function(done) {
      parser.parse(this.fixtures.sampleStatementOFX, function(error, result){
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