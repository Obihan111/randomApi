const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Schema } = require('mongoose')

const newSchema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true,
    },

    Age: {
        type:Number,
        required:true,
        validate(value){  //from the mongoose validator
            if(value < 18){
                throw new Error('This is underage')
            }
        }
    },
    Email: {
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email')
            }

        }
    },
    Password: {
        type:String,
        minlength: 7,
        lowercase:true,
        trim:true,
        validate(value){
            if(value < 7){
                throw new Error('Password length is too small')
            }
        },
        required: true
    }
}, {timestamps:true})

newSchema.pre('save', function(next){  //note that this refers to the document
    if(this.isModified('Password')){
        bcrypt.hash(this.Password, 8, (err, hash) => {
            if(err){
                return next(err)
            }
            this.Password = hash
            next()
        })
    }
}) 



const Testing = mongoose.model('Testing', newSchema)

module.exports = Testing