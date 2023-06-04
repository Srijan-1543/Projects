//const fetch = require('node-fetch');
//const { urls, options } = require('../config/recipe');
const User = require('../models/user');
const Review = require('../models/reviews');

const recipe_controller = {
    getHome:
    /*
    (req,res) => {
        fetch(urls.feedsList,options)
        .then(response => response.json())
        .then(response => 
            {
                //res.send(response.results[0].item);
                res.render('feeds',{data: response});
            })
        .catch(err => console.log(err));
    },
    */

    (req,res) => {
        res.render('home',{functionality: 'getFeeds', id: req.params.id})
    },
    getRecipeDetails:
    async (req,res) => {
        let reviewData = null;
        await Review.find({recipeID: req.params.id})
        .then( review => {
            reviewData = review;
        })
        .catch(err=>{
            console.log(err);
        })
        /*
        let reviewData = [];
        console.log(req.params.id,'hehe');
        Review.findOne({recipeID: req.params.id})
        .then(review => {
            reviewData = review;
        })
        .catch(err => {
            console.log(err,'haha');
        });
        */
        console.log(reviewData,'hoho');
        if(!reviewData) reviewData = [];
        res.render('recipe',{functionality: 'getRecipeDetails', id: req.params.id, data: reviewData});
    },
    getTags:
    (req,res) => {
        res.render('recipe',{functionality: 'getTags', id: req.params.id})
    },
    getRecipeAutoComplete:
    (req,res) => {
        res.render('recipe',{functionality: 'getRecipeAutoComplete', id: req.params.id})
    },
    getRecipeList:
    (req,res) => {
        var from,tag;
        if(!req.query.from)
        {
            from = '0';
        }
        else
        {
            from = req.query.from;
        }
        if(!req.query.tag)
        {
            tag = '';
        }
        else
        {
            tag = req.query.tag;
        }
        if(!req.query.q)
        {
            q = '';
        }
        else
        {
            q = req.query.q;
        }
        res.render('list',{functionality: 'getRecipeList', from,tag,q});
    },
    getRecipeListSimilar:
    (req,res) => {
        res.render('recipe',{functionality: 'getRecipeSimilar', id: req.params.id})
    },
    saveRecipe:
    async (req,res) => {
        await User.findOne({email: req.user.email})
        .then(user =>{
            if(!user.savedRecipes.find(id=> { return id == req.body.id}) || user.savedRecipes.length==0)
            {
                user.savedRecipes.push(req.body.id);
                user.savedRecipeName.push(req.body.name);
                user.savedRecipeImg.push(req.body.img);
                user.save();
                user.markModified('savedRecipes');
                user.markModified('savedRecipeName');
                user.markModified('savedRecipeImg');
            }
        })
        .catch(err => {
            console.log(err);
        });
        res.redirect('/'+req.body.id);
    },
    unSaveRecipe:
    async (req,res) => {
        await User.findOne({email: req.user.email})
        .then(user => {
            user.savedRecipes.splice(req.body.index,1);
            user.savedRecipeName.splice(req.body.index,1);
            user.savedRecipeImg.splice(req.body.index,1);
            user.save();
            user.markModified('savedRecipes');
            user.markModified('savedRecipeName');
            user.markModified('savedRecipeImg');
        })
        .catch(err => {
            console.log(err);
        });
        res.redirect('/auth/dashboard');
    },
    createComment:
    (req,res) => {
        let review = new Review({
            email: req.user.email,
            name: req.user.name,
            recipeID: parseInt(req.body.cid),
            recipeName: req.body.recipeName,
            review: req.body.comments,
            rating: req.body.rating
        });
        review.save();
        res.redirect('/'+req.body.cid);
    },
    removeComment:
    async (req,res) => {
        await Review.findByIdAndDelete(req.body.rid)
        .then('Review deleted successfully')
        .catch(err => {
            console.log(err);
        });
        res.redirect('/auth/dashboard');
    }
};

module.exports = recipe_controller;