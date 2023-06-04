const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
//const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
const db = 'mongodb://127.0.0.1:27017/csoe_project';
mongoose.connect(db,{useNewUrlParser: true});

app.use(express.urlencoded({ extended: false}));

//app.use(expressLayouts);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine','ejs');

app.use(session({
    secret: 'csoe_project',
    resave: true,
    saveUninitialized:true
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/',require('./routes/recipes'));
app.use('/auth',require('./routes/auth'));
app.use('/dashboard',require('./routes/dashboard'));


const PORT = process.env.PORT || 3000;
app.listen(PORT,console.log(`APP RUNNING SUCCESSFULLY IN ${PORT}`))