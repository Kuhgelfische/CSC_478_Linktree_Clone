const path = require('path');
const { randomString } = require('../util/rand');
const fileUpload = require('express-fileupload');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const fs = require('fs');

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
  const username = jwt.verify(req.header('x-session'), 'secretvalue')['username'];
  const filename = `${randomString()}.jpg`;
  const fPath = (path.join(__dirname, '..', '..', 'ui', 'public', 'backgrounds'));
  background.mv(path.join(fPath, filename));
  
  // Save the filename to the account
  let myaccount;
  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['username'] === username) {
      if(acct.bg && fs.existsSync(path.join(fPath, acct.bg))) {
        fs.unlinkSync(path.join(fPath, acct.bg));
      }
      accountStore[i]['bg'] = filename;
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