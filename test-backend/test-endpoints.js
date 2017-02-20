'use strict';

// ************   Setup tests *************
import test from 'ava';

const request = require('supertest');
const sinon = require('sinon');

const server = require('../server.js');

// ************   Test cases   *************

test.serial('If it cannot connect to db server or some error occured during the query, the status should be 500', async t => {
  t.plan(1);

  const queryDbStub = sinon.stub();
  const err = new Error('Error occured with the db');
  queryDbStub.callsArgWith(1, err, '');

  const myServer = server(queryDbStub);

  const res = await request(myServer)
    .post('/api/login')
    .send({ email: 'a@a.hu', password: 'error in db' });

  t.is(res.status, 500);

  queryDbStub.reset();
});

test.serial('wrong endpoint returns 404', async t => {
  t.plan(1);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { asd: 'asdasd' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
    .get('/signupdfsd')
    .send();

  t.is(res.status, 404);

  queryDbStub.reset();
});

test.serial('after unsuccesfull login it returns 401', async t => {
  t.plan(1);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'unsuccesfull login' });

  t.is(res.status, 401);

  queryDbStub.reset();
});

test.serial('after succesfull login it returns 200 status and an object', async t => {
  t.plan(2);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'a' });

  t.is(res.status, 200);
  t.true(typeof res.body === 'string');

  queryDbStub.reset();
});

test.serial('after register it returns 200 status and an object with the sent email', async t => {
  t.plan(3);

  const queryDbStub = sinon.stub();
  queryDbStub.onCall(0).callsArgWithAsync(1, null, null);
  queryDbStub.onCall(1).callsArgWithAsync(1, null, { email: 'a@a.hu' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/register')
      .send({ email: 'a@a.hu', password: 'a' });

  t.is(typeof res, 'object');
  t.is(res.body.email, 'a@a.hu');
  t.is(res.status, 200);

  queryDbStub.reset();
});

test.serial('after unsuccesfull register (user exists) it returns 403 status', async t => {
  t.plan(3);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/register')
      .send({ email: 'a@a.hu', password: 'a' });

  t.true(typeof res === 'object');
  t.falsy(res.body.email);
  t.is(res.status, 403);

  queryDbStub.reset();
});
