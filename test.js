'use strict';

import test from 'ava';
const server = require('./server.js');
const request = require('supertest');

const myServer = server('');


test('foo', t => {
  t.pass();
});

test('bar', async t => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
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


test('wrong endpoint returns 404', async t => {
  t.plan(1);

  const res = await request(myServer)
    .get('/signupdfsd');

  t.is(res.status, 404);
});
