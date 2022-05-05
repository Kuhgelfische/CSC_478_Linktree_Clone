const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const accountStore = require('../store/accounts');

// Allow JSON payloads from our frontend
router.use(express.json({}));

router.post('/createAcct', (req, res) => {
  // Pull out the payload fields
  const { username, email, password1, password2 } = req.body;

  // Check empty fields
  if (!username || !email || !password1 || !password2) {
    res.status(401).json({ ok: false, msg: "Please enter all fields" });
    return;
  }

  // Check passwords match
  if (password1 !== password2) {
    res.status(401).json({ ok: false, msg: "Passwords do not match" });
    return;
  }
  // Usernames and emails will be lowercase from here on out.
  var userN = username.toLowerCase();
  var eMail = email.toLowerCase();
  for(var i of accountStore) {
    if(i.username === userN) {
      res.status(401).json({ok: false, msg: "An account with that username already exists."})
      return;
    } else if(i.email === eMail) {
      res.status(401).json({ok: false, msg: "An account with that email address already exists."})
      return;
    }
  }
  accountStore.push({
    username: userN,
    email: eMail,
    password: bcrypt.hashSync(password1, 5),
    links: [],
    bio: "",
    bg: null
  });

  console.log(accountStore);

  res.json({
    ok: true
  });

});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  if(!username || !password) {
    res.status(401).json({ok: false, msg: "Please enter all fields"});
  }
  for(var i of accountStore) {
    if(i.username && i.username === username.toLowerCase()) {
      if(bcrypt.compareSync(password, i.password)) {
        const token = jwt.sign({ username: i.username }, 'secretvalue');
        res.json({
          ok: true,
          data: {
            token
          }
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