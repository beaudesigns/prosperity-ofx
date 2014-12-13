var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var parser = require('../../lib/ofx');


var loadFixture = function(fixtures, name, filename) {  
  var data = fs.readFileSync(filename, 'utf-8');
  fixtures[name] = data.toString();
};


describe('OFX', function() {
  describe('#parse', function() {
    it('returns an error for invalid input', function(done) {
      parser.parse('<OFX><SIGNONMSGSRQV1><SONRQ>>>', function(error){
        expect(error).to.be.ok;
        done();
      });
    });

    describe('OFX v1.0.2', function() {
      var FIXTURE_PATH = path.join(__dirname, '../fixtures/v1.0.2');

      before(function(){
        this.fixtures = {};
        loadFixture(this.fixtures, 'sampleStatementOFX', path.resolve(FIXTURE_PATH, 'sample-statement.ofx'));
        loadFixture(this.fixtures, 'sampleStatementJSON', path.resolve(FIXTURE_PATH, 'sample-statement.json'));
      });

      after(function(){
        this.fixtures = {};
      });

      it('parses the sample statement', function(done) {
        parser.parse(this.fixtures.sampleStatementOFX, function(error, response){
          expect(error).to.be.null;
          expect(response).to.deep.equal(JSON.parse(this.fixtures.sampleStatementJSON));
          done();
        }.bind(this));
      });
    });

    describe('OFX v1.0.3', function() {
      var FIXTURE_PATH = path.join(__dirname, '../fixtures/v1.0.3');

      before(function(){
        this.fixtures = {};
        loadFixture(this.fixtures, 'sampleTransactionsOFX', path.resolve(FIXTURE_PATH, 'sample-transactions.ofx'));
        loadFixture(this.fixtures, 'sampleTransactionsJSON', path.resolve(FIXTURE_PATH, 'sample-transactions.json'));
      });

      after(function(){
        this.fixtures = {};
      });

      it('parses the sample transactions', function(done) {
        parser.parse(this.fixtures.sampleTransactionsOFX, function(error, response){
          expect(error).to.be.null;
          expect(response).to.deep.equal(JSON.parse(this.fixtures.sampleTransactionsJSON));
          done();
        }.bind(this));
      });
    });

    describe('OFX v2.0.3', function() {
      var FIXTURE_PATH = path.join(__dirname, '../fixtures/v2.0.3');

      before(function(){
        this.fixtures = {};
      });

      after(function(){
        this.fixtures = {};
      });
    });

    describe('OFX v2.1.1', function() {
      var FIXTURE_PATH = path.join(__dirname, '../fixtures/v2.1.1');

      before(function(){
        this.fixtures = {};
      });

      after(function(){
        this.fixtures = {};
      });
    });
  });
});