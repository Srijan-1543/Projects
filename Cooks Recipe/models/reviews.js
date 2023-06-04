const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    recipeID:{
        type: Number ,
        required: true
    },
    recipeName:{
      type: String,  
      required: true
    },
    rating:{
        //type: mongoose.SchemaTypes.Decimal128,
        type: Number,
        required: true,
        default: null
    },
    review:{
        type: String,
        required: true
    }
});

const Review = mongoose.model('Review',ReviewSchema,'reviews');

module.exports = Review;