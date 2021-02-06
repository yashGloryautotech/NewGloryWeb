// importing mongoose module
const { text } = require('body-parser');
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let ServiceModel = new Schema(
    {
        Serviceid: {
            type: String,
            required:true,
            unique: true
        },
        ServiceName: {
            type: String,
            //required:true,
        },
        ServiceDescription: {
            type: String,
            //required:true,
        },
        ServiceLogo:{
            //type: String,
        },
        ServiceImage:{
            //type: String, 
        } 
        }
)
mongoose.model('OurService', ServiceModel);