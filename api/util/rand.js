const crypto = require('crypto');

function randomString()
{
  return crypto.randomBytes(8).toString('base64url');
}

module.exports = { randomString }