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
});

router.post('/links', (req, res) => {
  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }

  // Find account
  const decoded = jwt.verify(token, 'secretvalue');
  let account = null;
  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['email'] === decoded['username']) {
      account = acct;
    }
  }

  // Generate ID for new link
  let newId = 0;
  for (var i in account['links']) {
    const lnk = account['links'][i];
    if (lnk['id'] > newId)
      newId = lnk['id'];
  }
  newId++;

  // Add link to store
  const newLink = { id: newId, title: "", url: "" };
  account['links'].push(newLink);

  // Return link object to frontend
  res.json({
    ok: true,
    link: newLink
  })
})

module.exports = router;