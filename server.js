const express = require('express');
// App Setup
const app = express();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');
require('./controllers/posts.js')(app);

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




// Routes 
app.get('/', (req, res) => {
  res.render('posts-index')
})


// Routes 
app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})







  

// Start Server
app.listen(3000, () => {
    console.log('Reddit Search listening on port localhost:3000!');
});