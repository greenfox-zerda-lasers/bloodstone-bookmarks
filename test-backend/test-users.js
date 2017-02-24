'use strict';

// ************   Setup tests *************
import test from 'ava';

const users = require('../server/users.js');


// ************   Test cases   *************

test('check if users.lookUpUser is exist and fires a callback', (t) => {
  t.plan(1);
  let returnValue = '';
  // mocking the db function
  const queryDbStub = function (queryText, callback) {
    callback(queryText);
  };
  // create a simple callback
  const simpleCallback = function (queryText) {
    returnValue = queryText;
  };
  // create an instance of bookmarks
  const myUsers = users(queryDbStub);
  // fire saveBookmark method
  myUsers.lookUpUser('email', simpleCallback);
  const expectedValue = "SELECT * FROM users WHERE EMAIL = 'email'";

  t.is(returnValue, expectedValue);
});

test('check if users.registerUser is exist and fires a callback', (t) => {
  t.plan(1);
  let returnValue = '';
  // mocking the db function
  const queryDbStub = function (queryText, callback) {
    callback(queryText);
  };
  // create a simple callback
  const simpleCallback = function (queryText) {
    returnValue = queryText;
  };
  // create an instance of bookmarks
  const myUsers = users(queryDbStub);
  // fire saveBookmark method
  myUsers.registerUser('email', 'hash', simpleCallback);
  const expectedValue = "INSERT INTO users (EMAIL, PASSWORD) VALUES ('email', 'hash')  RETURNING (EMAIL)";

  t.is(returnValue, expectedValue);
});

test('check if users.getUserID is exist and fires a callback', (t) => {
  t.plan(1);
  let returnValue = '';
  // mocking the db function
  const queryDbStub = function (queryText, callback) {
    callback(queryText);
  };
  // create a simple callback
  const simpleCallback = function (queryText) {
    returnValue = queryText;
  };
  // create an instance of bookmarks
  const myUsers = users(queryDbStub);
  // fire saveBookmark method
  myUsers.getUserID('email', simpleCallback);
  const expectedValue = "SELECT user_id FROM users WHERE EMAIL = 'email'";

  t.is(returnValue, expectedValue);
});
