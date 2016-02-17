var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

var User = require('../app/models/user');
var app = require('../server');

describe('api', function() {
  it('can save a new person', function(done) {
    var person = {
      name: 'Jon',
      age: 23
    };
    request(app)
    .post('/api/user')
    .send(person)
    .expect(201)
    .end(function(err,result){
      expect(err).to.not.exist;
      expect(result.body).to.have.property('name');
      done();
    });
  });
  after(function(done) {
    User.remove({
    },function(err, conn) {
      expect(err).to.not.exist;
      done();
    }); 
  });
               
});
