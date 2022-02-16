const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.json({
    status: 'ok'
  });
});

app.listen(PORT, _ => console.log(`API listening on port ${PORT}`));