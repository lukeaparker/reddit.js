const express = require('express');

// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    console.log(req.query) // => "{ term: hey" }
    res.render('home')
  })


  // Start Server
app.listen(3000, () => {
    console.log('Reddit Search listening on port localhost:3000!');
  });