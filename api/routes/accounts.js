const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const accountStore = require('../store/accounts');

// Allow JSON payloads from our frontend
router.use(express.json({}));

router.post('/createAcct', (req, res) => {
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

router.post('/login', (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    res.status(401).json({ok: false, msg: "Please enter all fields"});
  }
  for(var i of accountStore) {

    if(i.email && i.email === email) {
      if(bcrypt.compareSync(password, i.password)) {
        res.json({
          ok: true
        })
        return;
      } else {
        res.status(401).json({ok: false, msg: "Invalid password"})
        return;
      }
    }
  }
  res.status(401).json({ok: false, msg: "Account not found."})
})

module.exports = router;