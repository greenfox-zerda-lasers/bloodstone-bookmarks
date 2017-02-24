'use strict';

// ************   Setup tests *************
import test from 'ava';

const bookmarks = require('../server/bookmarks.js');


// ************   Test cases   *************

test('check if bookmarks.saveBookmark is exist and fires a callback', (t) => {
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
  const myBookmarks = bookmarks(queryDbStub);
  // fire saveBookmark method
  myBookmarks.saveBookmark('userID', 'url', 'title', simpleCallback);
  const expectedValue = "INSERT INTO bookmarks (user_id, url, title) VALUES ('userID', 'url', 'title') RETURNING (url)";

  t.is(returnValue, expectedValue);
});

test('check if bookmarks.getList is exist and fires a callback', (t) => {
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
  const myBookmarks = bookmarks(queryDbStub);
  // fire saveBookmark method
  myBookmarks.getList('userID', simpleCallback);
  const expectedValue = "SELECT url, title FROM users RIGHT JOIN bookmarks ON users.user_id = bookmarks.user_id WHERE users.user_id = 'userID'";

  t.is(returnValue, expectedValue);
});
