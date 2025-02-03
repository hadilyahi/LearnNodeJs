const mongoose = require('mongoose');
const Joi = require('joi');

// book scheama
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3,
        maxlenght: 250,
    },
    author:{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    price :{
        type:Number,
        required:true,
        min:0,
    },
    cover:{
        type:String,
        required:true,
        enum:["soft cover","hard cover"]
    }
} ,
{ timestamps: true }
);

// book model
const Book = mongoose.model("Book", BookSchema);
// validate create book 
function validateCreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        description: Joi.string().trim().min(5).required(),
        author: Joi.string().required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover","hard cover").required(),
      });
    
     return schema.validate(obj);
}
function validateUpdateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(250),
        description: Joi.string().trim().min(5),
        author: Joi.string(),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover","hard cover"),
      });
    
     return schema.validate(obj);
}

module.exports = {Book,validateCreateBook,validateUpdateBook} ; 