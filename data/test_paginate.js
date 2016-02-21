var chai = require('chai');
var querystring = require('querystring');
var request = require('supertest');
var expect = chai.expect;

describe('pagination', function() {
  it('can retrieve the first N values, sorted by age ascending', function(done) {
    var n = 5;
    var qs = {
      order: 'asc',
      key: 'age',
      paginate: n
    };
    var endpoint = '/api/user?'+querystring.stringify(qs);
    var url = 'http://localhost:3000';
    request(url)
    .get(endpoint)
    .expect(200)
    .end(function(err, result) {
      expect(err).to.not.exist;
      expect(result.body).to.have.length(5);
      expect(result.body[0].age).to.eql(18);
      done();
    });
  });
});
