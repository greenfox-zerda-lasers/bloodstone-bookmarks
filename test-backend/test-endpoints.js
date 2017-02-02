'use strict';

// ************   Setup tests *************
import test from 'ava';

const request = require('supertest');
const sinon = require('sinon');

const server = require('../server.js');

// ************   Test cases   *************

test('wrong endpoint returns 404', async t => {
  t.plan(1);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
    .get('/signupdfsd')
    .send();

  t.is(res.status, 404);
});

test('after succesfull login it returns 200 status and an object', async t => {
  t.plan(2);
  console.log('after succesfull login it returns 200');

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'a' });

  t.is(res.status, 200);
  t.true(typeof res.body === 'object');

  queryDbStub.reset();
});

test('If it cannot connect to db server or some error occured during the query, the status should be 500', async t => {
  console.log('the status should be 500');
  const queryDbStub1 = sinon.stub();
  const err = new Error('Error occured with the db');
  queryDbStub1.callsArgWithAsync(1, err, '');

  const myServer = server(queryDbStub1);

  const res = await request(myServer)
    .post('/api/login')
    .send({ email: 'a@a.hu', password: 'a' });

  t.is(res.status, 500);

  queryDbStub1.reset();
});

test('after register it returns 200 status and an object', async t => {
  t.plan(2);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/register')
      .send({ email: 'a@a.hu', password: 'aaa' });

  t.is(res.status, 200);
  t.true(typeof res.body === 'object');
});

test('after unsuccesfull login it returns 401', async t => {
  t.plan(1);

  const queryDbStub = sinon.stub();
  queryDbStub.callsArgWithAsync(1, null, { user_id: 1, email: 'a@a.hu', password: 'a' });

  const myServer = server(queryDbStub);

  const res = await request(myServer)
      .post('/api/login')
      .send({ email: 'a@a.hu', password: 'aaa' });

  t.is(res.status, 401);

  queryDbStub.reset();
});
