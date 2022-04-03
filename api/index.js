const cors = require('cors');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// This would be bad for prod, but in order to
// interact with the API from the UI, we need
// to allow CORS
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
  res.json({
    status: 'ok'
  });
});

app.use('/accounts', require('./routes/accounts'));

app.listen(PORT, _ => console.log(`API listening on port ${PORT}`));