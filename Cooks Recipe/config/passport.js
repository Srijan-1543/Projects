const LocalStorage = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

module.exports = function(passport){
    passport.use(
        new LocalStorage({usernameField: 'email'},(email,password,done) =>{
            User.findOne({email: email})
            .then(user =>{
                if(!user)
                {
                    console.log("No user found using passport authentication");
                    return done(null,false,{message: 'That email is not registered'});
                }

                bcrypt.compare(password,user.password,(err,success) => {
                    if(err) throw err;
                    if(success)
                    {
                        console.log("Password matches");
                        return done(null,user);
                    }
                    else
                    {
                        console.log("Password doesn't match");
                        return done(null,false,{message: "Incorrect password found during passport authentication"});
                    }
                });
            })
            .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user,done) => {
        done(null,user.id);
    });

    passport.deserializeUser((id,done) => {
        User.findById(id)
        .then(user =>{
            done(null,user);
        });
        /*
        ((err,usert) => {
            done(err,usert);
        })(err,usert);
        */
    });
}

