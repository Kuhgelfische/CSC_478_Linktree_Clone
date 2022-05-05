const express = require('express');
const router = express.Router();

const accountStore = require('../store/accounts');

router.get('/:username', (req, res) => {
  const username = req.params.username;

  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['username'] === username) {
      res.json({
        ok: true,
        data: {
          links: acct['links'],
          bio: acct['bio'],
          bg: acct['bg']
        }
      });
      return;
    }
  }

  res.status(404).json({
    ok: false,
    msg: "No such user"
  })
});

module.exports = router;