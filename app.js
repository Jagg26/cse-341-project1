const express = require('express');
const mongodb = require('./data/database.js');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', require('./routes'));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
        console.log(`Databse is listening and Server is running at http://localhost:${port}`);
      });
  }
});


module.exports = app;
