var chai = require('chai');
var assert = chai.assert;

var userController = require('../src/controllers/user.controller');

describe('User Controller', function() {
    describe('sign out', function(){
        it('Should return json with message bye', function(){
              let result = userController.signout();
              assert.equal(result, "Bye");
        });
    });
});
