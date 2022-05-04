const path = require('path');
const { randomString } = require('../util/rand');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const accountStore = require('../store/accounts');

router.use(express.urlencoded({extended: true}))
router.use(fileUpload({
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 // 2 MB
  },
  createParentPath: true
}))

router.post('/background', (req, res) => {
  // Validate files uploaded
  if (!req.files) {
    res.status(400).json({
      ok: false,
      msg: "No image data uploaded"
    });
    return;
  }

  const background = req.files['background'];

  // Validate JPEG
  if (background.mimetype != 'image/jpeg') {
    res.status(400).json({
      ok: false,
      msg: "Please upload a proper JPEG file"
    });
    return;
  }

  // Save file
  const filename = `${randomString()}.jpg`;
  background.mv(path.join(__dirname, '..', 'uploads', filename));
  
  // Save the filename to the account
  const username = jwt.verify(req.header('x-session'), 'secretvalue')['username'];
  let myaccount;
  for (var acct of accountStore) {
    if (acct['username'] === username) {
      acct.bg = filename;
      myaccount = acct;
      break;
    }
  }
  
  res.json({
    ok: true,
    account: myaccount
  });
});

module.exports = router;