
const  mongoose  = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        trim:true,
        minlenght:3,
        maxlenght:200,
    },
    lastName :{
        type:String,
        required:true,
        trim:true,
        minlenght:3,
        maxlenght:200,
    },
    nationality :{
        type:String,
        required:true,
        trim:true,
        minlenght:2,
        maxlenght:100,
    },
    
},
{
    timestamps:true
}) 

function validateCreateAuthor  (obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(2).max(100).required(),
       
      });
      return schema.validate(obj);
}
function validateUpdateAuthor  (obj){
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(2).max(100),
       });
      return schema.validate(obj);
}

const Author = mongoose.model("Author",AuthorSchema);

module.exports =   {Author,validateCreateAuthor,validateUpdateAuthor} ;