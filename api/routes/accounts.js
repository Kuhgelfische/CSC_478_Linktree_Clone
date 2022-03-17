const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const accountStore = require('../store/accounts');

// Allow JSON payloads from our frontend
router.use(express.json({}));

router.post('/', (req, res) => {
  // Pull out the payload fields
  const { email, password1, password2 } = req.body;

  // Check empty fields
  if (!email || !password1 || !password2) {
    res.status(401).json({ ok: false, msg: "Please enter all fields" });
    return;
  }

  // Check passwords match
  if (password1 !== password2) {
    res.status(401).json({ ok: false, msg: "Passwords do not match" });
    return;
  }

  accountStore.push({
    email,
    password: bcrypt.hashSync(password1, 5)
  });

  console.log(accountStore);

  res.json({
    ok: true
  });

});

module.exports = router;