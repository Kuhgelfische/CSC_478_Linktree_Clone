const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

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

module.exports = router;