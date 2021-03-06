require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser()); // Add this after you initialize express.


// db
require('./data/reddit-db')

// set db
const exphbs = require('express-handlebars')

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// auth middleware
let checkAuth = (req, res, next) => {
  // console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
      req.user = null;
  } else {
      let token = req.cookies.nToken;
      let decodedToken = jwt.decode(token, { complete: true } || {});
      req.user = decodedToken.payload;
  }
  next();
}
app.use(checkAuth);

// routes
app.get('/posts/new', (req, res) => res.render('posts-new'))

require('./controllers/posts.js')(app)

require('./controllers/comments.js')(app)

require('./controllers/auth.js')(app)



// Start Server
app.listen(3000, () => {
  console.log('Reddit Search listening on port localhost:3000!');
});

module.exports = app
