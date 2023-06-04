const User = require('../models/user');
const Review = require('../models/reviews');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const auth_controller = {
    getAuthentication:
        (req,res) => {
            res.render('auth');
        },
    getSignIn:
        (req,res) => {
            res.render('signin');
        },
    validateSignUp:
    (req,res) => {
        console.log(req.body);
        const {name, email, contactNumber, password, verifypassword} = req.body;
        let errors = [];
        if(!name || !email || !password || !verifypassword)
        {
            errors.push({err: "Please fill in mandatory details"});
            console.log(name,email,password,verifypassword);
        }
        if(password != verifypassword)
        {
            errors.push({err:"Password fields do not match"});
        }
        
        if( !password || password.length < 8 )
        {
            errors.push({err: "Password length should atleast be 8"});
        }
        
        if(errors.length > 0)
        {
            console.log(errors);
            res.redirect('/auth/authenticate');
        }
        else
        {
            User.findOne({email: email})
            .then(user => {
                if(user)
                {
                   res.send("User already exists"); 
                }
                else
                {

                    const newUser = new User({
                        name: name,
                        password: password,
                        email: email,
                        contactNumber: contactNumber
                    });

                    bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password,salt, (err,hash) =>
                    {
                        if(err)
                        {
                            console.log("Error in salting password");
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save()
                        .then(user =>{
                            console.log(user);
                        })
                        .catch(err => console.log(err));
                        res.redirect('/auth/authenticate');
                    }))
                }
            })
        }
    },
    validateSignIn:
    (req,res,next) => {
        passport.authenticate('local',{
            successRedirect: '/auth/dashboard',
            failureRedirect: '/auth/authenticate',
            successMessage:{message: 'signin success'},
            failureMessage:{message:'signin failed ra bunda'}
        }) (req,res,next);

    },
    verify:
    (req,res) => {
        console.log(req.user);
        res.redirect('/auth/dashboard')
        //res.render('layout',{user: req.user});
    },
    getDashboard:
    (req,res) => {
        Review.find({email: req.user.email})
        .then(reviewData => {
            res.render('dashboard',{user: req.user, reviewData});
        })
        .catch(err => {
            console.log(err);
        });
    }
}

module.exports = auth_controller;
