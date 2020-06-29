var assert = require('assert');
var request = require('supertest');

var request = request("http://localhost:3000");

describe('Categories', function() {
    describe('GET', function(){
        it('Should return json as default data format', function(done){
            request.get('/category/get-all-categories')
              .expect('Content-Type', /json/)
              .expect(201, done);
        });
    });
});

describe('Publications', function() {
  describe('GET', function(){
      it('Should return json as default data format', function(done){
          request.get('/publication/get-all-publications/null')
            .expect('Content-Type', /json/)
            .expect(200, done);
      });
  });
});

describe('Session', function() {
  describe('Post', function(){
    let data = {
      "firstName": "Test",
	    "lastName": "Test",
	    "email1": "test@ingenio.com",
	    "password": "aA@12345678",
	    "confirmPassword": "aA@12345678",
	    "description": "I want to be an author",
    }
      it('respond with 201 created', function(done){
          request.post('/session/signup')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
      });
  });
});

