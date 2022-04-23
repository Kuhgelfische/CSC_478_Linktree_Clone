const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.use(express.json({}));

const accountStore = require('../store/accounts');

// NOTE: because this gets imported under /session in index,
//       we want the route here to be /
router.get('/', (req, res) => {
  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }

  const decoded = jwt.verify(token, 'secretvalue');

  // TODO: add more session data of some kind
  res.json({
    ok: true,
    session: {
      email: decoded['username']
    }
  })
});

// TODO: should we move this somewhere else?
router.get('/links', (req, res) => {
  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }

  const decoded = jwt.verify(token, 'secretvalue');

  // TODO: provide an interface for the store
  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['email'] === decoded['username']) {
      res.json({
        links: acct['links']
      });
      return;
    }
  }

  res.status(400).json({
    ok: false,
    msg: "Invalid token"
  })
});

router.put('/links', (req, res) => {
  const links = req.body['links'];

  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }

  const decoded = jwt.verify(token, 'secretvalue');

  // TODO: provide an interface for the store
  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['email'] === decoded['username']) {
      accountStore[i]['links'] = links;
      res.json({
        ok: true
      });
      return;
    }
  }

  res.status(400).json({
    ok: false,
    msg: "Invalid token"
  })
})

module.exports = router;