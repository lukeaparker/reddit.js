require('./controllers/posts.js')(app);
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
// Set db
require('./data/reddit-db');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());
// App Setup
const app = express();

// Middleware
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Mongoose 
var postSchema = new mongoose.Schema({
    userName: {type: 'string', required: true},
    newPost: {type: 'string', required: true}
})
var Post = mongoose.model('Post', postSchema)

// Routes 
app.get('/', (req, res) => {
    res.render('home')
  })

app.get('/posts', (req, res) => {
const all_posts = Post.find()
    res.render('posts', {all_posts})
})

app.get('/posts/new', (req, res) => {
    res.render('posts-new')
})

Post.find({})
.then(posts => {
    res.render("posts-index", { posts });
})
.catch(err => {
    console.log(err.message);
});


// Start Server
app.listen(3000, () => {
    console.log('Reddit Search listening on port localhost:3000!');
});