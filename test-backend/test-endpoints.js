'use strict';

// ************   Setup tests *************
import test from 'ava';

const request = require('supertest');
const sinon = require('sinon');

const queryDb = require('../db.js');
const pg = require('pg');
const client = new pg.Client();

const server = require('../server.js');

let myServer = server('');


// ************   Test cases   *************

test('the db callback function called once', async t => {

  const clientMock = sinon.mock(client.connect);
  clientMock.returns(callback(null, { email: 'a@a.hu', password: 'a' }));

  const myServer = server(queryDb);
  const res = await request(myServer)
  .post('/api/login')
  .send({ email: 'a@a.hu', password: 'a' });

  clientMock.restore();
  clientMock.verify();


  sinon.assert.calledOnce(callback);
});

test('wrong endpoint returns 404', async t => {
  t.plan(1);

  const res = await request(myServer)
    .get('/signupdfsd');

  t.is(res.status, 404);
});

test.skip('after succesfull login it returns 200 status and an object', async t => {
  t.plan(2);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'a' });

  t.is(res.status, 200);
  t.true(typeof res.body === 'object');
});

test.skip('after unsuccesfull login it returns 401', async t => {
  t.plan(1);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'aaa' });

  t.is(res.status, 401);
});

test('after register it returns 200 status and an object', async t => {
  t.plan(2);

  const res = await request(myServer)
      .post('/api/register')
      .send({ email: 'a@a.hu', password: 'aaa' });

  t.is(res.status, 200);
  t.true(typeof res.body === 'object');
});
