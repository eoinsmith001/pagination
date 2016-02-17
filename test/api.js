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
  it('can retrieve all users', function(done) {
    request(app)
    .get('/api/user')
    .expect(200)
    .end(function(err,result){
      expect(err).to.not.exist;
      var users = result.body;
      expect(users).to.be.instanceof(Array);
      expect(users).to.have.length(1);
      done();
    });
  });
  describe('multiple users', function() {
    before(function(done) {
      var users = [
        { name: 'Tom', age: 33 },
        { name: 'Eve', age: 44 }
      ];
      users.map(function(u){
        request(app)
        .post('/api/user')
        .send(u)
        .expect(201)
        .end(function(err) {
          expect(err).to.not.exist;
        });
      });
      done();
    });
    it('can retrieve all users in descending order of age',function(done) {

      request(app)
      .get('/api/user')
      .expect(200)
      .end(function(err, result) {
        expect(err).to.not.exist;
        var users = result.body;
        expect(users).to.have.length(3);
        expect(users[0].age).to.be.above(users[1].age);
        expect(users[1].age).to.be.above(users[2].age);
        done();
      });
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
