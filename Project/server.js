const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Controllers
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');

// Routes
app.get('/', homeController.homePage);

app.get('/login', authController.loginPage);
app.post('/login', authController.login);

app.get('/register', authController.registerPage);
app.post('/register', authController.register);

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/main', (req, res) => {
  res.render('main');
});

app.post('/comment', homeController.addComment);

app.get('/logout', (req, res) => {
  req.session.loggedIn = false;
  req.session.user = null;
  res.redirect('/');
});

app.post('/delete-comments', authController.isAdmin, homeController.deleteComments);

// Connect to MongoDB and start the server
const { connect } = require('./models/database');

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
