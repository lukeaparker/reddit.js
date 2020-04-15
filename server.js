const express = require('express');
const mongoose = require('mongoose')

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


  // Start Server
app.listen(3000, () => {
    console.log('Reddit Search listening on port localhost:3000!');
  });