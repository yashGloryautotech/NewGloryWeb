// importing mongoose module
const { text } = require('body-parser');
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let GetInTouchModel = new Schema(
    {
        id: {
            type: String,
            required:true,
            unique: true
        },
        Name: {
            type: String,
            required:true,
        },
        Email: {
            type: String,
            required:true,
        },
        ContactNo: {
            type: Number,
            required:true,
        },
        Message:{
            type:String,
            required:true
        }
        }
)
mongoose.model('GetInTouch', GetInTouchModel);