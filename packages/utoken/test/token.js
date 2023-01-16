const path = require('path');
const {generate, generateHeader, verify, encodeSecret} = require('../dist');

const secret = encodeSecret(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
);
const alg = 'HS256'

generate({
  secret,
  alg,
  issueAt: true,
  expirationTime: '2w'
}).then(async result => {
  const v = await verify(result.header, result.token, secret);
  console.log('header : ', generateHeader(alg));
  console.log('generate : ', result);
  console.log('verify : ', v);
});

generate({
  secret,
  alg,
}).then(async result => {
  const v = await verify(result.header, result.token, secret);
  console.log('header : ', generateHeader(alg));
  console.log('generate : ', result);
  console.log('verify : ', v);
});
