import test from 'ava';
var app = require('./server.js');
var request = require('supertest');


test('foo', t => {
  t.pass();
});

test('bar', async t => {
  var bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});

test('after login it returns the email and a list of links', async t => {
  t.plan(3);

  var res = await request(app)
      .post('/api/login')
      .send({ email: 'ava@rocks.com', password: '123123' });

  t.is(res.status, 200);
  t.is(res.body.email, 'ava@rocks.com');
  t.true(typeof res.body.links === 'object');
});

test('after login it returns the email and a list of links', async t => {
  t.plan(3);

  var res = await request(app)
      .post('/api/register')
      .send({ email: 'ava@rocks.com', password: '123123' });

  t.is(res.status, 200);
  t.is(res.body.email, 'ava@rocks.com');
  t.true(typeof res.body.message === 'string');
});

test('wrong endpoint returns 404', async t => {
  t.plan(1);

  var res = await request(app)
    .get('/signupdfsd');

  t.is(res.status, 404);
});
