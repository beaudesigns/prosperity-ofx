var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
var FIXTURE_PATH = path.join(__dirname, '../fixtures');
var parser = require('../../lib/ofx');

describe('OFX', function() {
  describe.only('#parse', function() {
    before(function(done){
      var filename = path.resolve(FIXTURE_PATH, 'sample-statement.ofx');
      
      fs.readFile(filename, 'utf-8', function(error, data){
        if (error) {
          throw error;
        }

        this.data = data.toString();
        done();
      }.bind(this));
    });

    it('returns an error for invalid input', function(done) {
      parser.parse('<OFX><SIGNONMSGSRQV1><SONRQ>>>', function(error){
        expect(error).to.be.ok;
        done();
      });
    });

    it('returns parses a file correctly', function(done) {
      parser.parse(this.data, function(error, response){
        expect(error).to.be.null;

        console.log(response);
        done();
      });
    });
  });
});