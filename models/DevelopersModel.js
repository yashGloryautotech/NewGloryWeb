// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let DevelopersModel = new Schema(
    {
        Devid: {
            type: String,
            required:true,
            unique: true
        },
        DevName: {
            type: String,
            required:true,
        },
        DevEmail: {
            type: String,
            required:true,
        },
        ContactNo: {
            type: Number,
            required:true,
        },
        DevSkill:{
            type:String,
            required:true
        },
        DevCurrentRole:{
            type:String,
            required:true
        }
        }
)
mongoose.model('Developer', DevelopersModel);