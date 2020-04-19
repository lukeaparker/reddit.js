const Post = require('../models/post')

module.exports = (app) => {
  // create post
  app.post('/posts/new', (req, res) => {
    // post model instance 
    const post = new Post(req.body)

    // save instance 
    post.save((err, post) => {
      if (err) {
        console.log(err.stack)
      }
      // redirect 
      return res.redirect('/')
    })
  })

  // index
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        res.render('posts-index', { posts })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // post  
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        res.render("post-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });




}