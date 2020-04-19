const express = require('express');
// App Setup
const app = express();

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('./data/reddit-db');
require('./controllers/posts.js')(app);



// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());



// require db
require('./data/reddit-db')




app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.get('/posts/new', (req, res) => res.render('posts-new'))

require('./controllers/posts.js')(app)


// Start Server
app.listen(3000, () => {
  console.log('Reddit Search listening on port localhost:3000!');
});

module.exports = app