import express = require('express');
const app = express();

//for testing npm scripts
app.get('/', (req, res) => {
  res.send('Hello World 2!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});
