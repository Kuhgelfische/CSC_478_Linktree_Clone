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
      username: decoded['username'],
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
    if (acct['username'] === decoded['username']) {
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
    if (acct['username'] === decoded['username']) {
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

/**
 * Requirement 2.2, 2.3
 * User should add (and delete) as many links as they want
 * (This function just updates links as they are sent)
 */
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
    if (acct['username'] === decoded['username']) {
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

router.get('/profile', (req, res) => {
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
    if (acct['username'] === decoded['username']) {
      res.json({
        ok: true,
        data: {
          bio: acct['bio']
        }
      });
      return;
    }
  }

  res.status(400).json({
    ok: false,
    msg: "Invalid token"
  })
});

/**
 * Requirement 1.5
 * User can edit profile from management screen
 */
router.put('/profile', (req, res) => {
  const bio = req.body['bio'];

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
    if (acct['username'] === decoded['username']) {
      /**
       * Requirement 3.2
       * User can set a custom bio
       */
      accountStore[i]['bio'] = bio;
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

router.get('/background', (req, res) => {
  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }

  const decoded = jwt.verify(token, 'secretvalue');

  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['username'] === decoded['username']) {
      res.json({
        ok: true,
        data: {
          background: acct['background']
        }
      });
      return;
    }
  }

  res.status(400).json({
    ok: false,
    msg: "Invalid token"
  })
})

/**
 * Requirements 3.1
 * User can set landing page background
 */
router.post('/background', async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm()
    
     form.parse(req, (err, fields, files) => {
         if (err) return reject(err)
         console.log(fields, files)
         console.log(files.file.filepath)
         var oldPath = files.file.filepath;
         var newPath = `./public/uploads/${files.file.originalFilename}`;
         mv(oldPath, newPath, function(err) {
         });
         res.status(200).json({ fields, files })
     })
 })
})
router.put('/background', (req, res) => {
  const mv = require('mv');
  const token = req.header('x-session');
  if (!token) {
    res.status(400).json({
      ok: false,
      msg: "Request did not contain session token"
    })
    return;
  }
  const decoded = jwt.verify(token, 'secretvalue');
  for (var i in accountStore) {
    const acct = accountStore[i];
    if (acct['username'] === decoded['username']) {
      const dst = `/../../ui/public/${acct['username']}_background.jpg`
      mv(newImg, dst);
      accountStore[i]['background'] = background;
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
