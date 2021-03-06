
const Post = require('../models/post')
const User = require('../models/user');

module.exports = (app) => {
// CREATE
app.get('/posts/new', function (req, res) {
      res.render('posts-new')
    })


app.post("/posts/new", (req, res) => {
  if (req.user) {
      var post = new Post(req.body);
      post.author = req.user._id;

      post
          .save()
          .then(post => {
              return User.findById(req.user._id);
          })
          .then(user => {
              user.posts.unshift(post);
              user.save();
              // REDIRECT TO THE NEW POST
              res.redirect(`/posts/${post._id}`);
          })
          .catch(err => {
              console.log(err.message);
          });
  } else {
      return res.status(401); // UNAUTHORIZED
  }
});


app.get("/", (req, res) => {
  let currentUser = req.user;
  Post.find({}).populate("author")
      .then(posts => {
          posts = JSON.parse(JSON.stringify(posts))
          res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
          console.log(err.message);
      });
    })


  // GET SINGLE POST
  app.get("/:id", (req, res) => {
    let currentUser = req.user;
    Post.findById(req.params.id)
        .populate({
            path: "comments",
            populate: {
                path: "author"
            }
        }).populate("author")
        .catch(err => {
            console.log(err);
        });
      })

// SUBREDDIT
app.get("/n/:subreddit", function (req, res) {
  var currentUser = req.user;
  Post.find({ subreddit: req.params.subreddit }).populate('author')
      .then(posts => {
          res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
          console.log(err);
      });
});
  }