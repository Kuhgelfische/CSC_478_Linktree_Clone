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
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use('/accounts', require('./routes/accounts'));
app.use('/session', require('./routes/session'));
app.use('/profiles', require('./routes/profile'));

app.listen(PORT, _ => console.log(`API listening on port ${PORT}`));