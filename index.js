import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' folder
app.use(express.static("public"));

// In-memory posts array (no database)
const posts = [];
// Home route - list all posts
app.get('/', (req, res) => {
  res.render("index.ejs", { posts });
});

// Form to create a new post
app.get('/posts/new', (req, res) => {
  res.render("new.ejs");
});

// Handle new post submission
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const id = posts.length + 1;
    posts.push({ id, title, content });
    res.redirect('/');
  } else {
    res.status(400).send('Title and content are required!');
  }
});

// View a single post by id
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  if (post) {
    res.render("post.ejs", { post });
  } else {
    res.status(404).send('Post not found');
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});