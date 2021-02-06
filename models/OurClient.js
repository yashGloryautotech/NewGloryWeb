// importing mongoose module
const { text } = require('body-parser');
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let ClientModel = new Schema(
    {
        Clientid: {
            type: String,
            required:true,
            unique: true
        },
        ClientName: {
            type: String,
            required:true,
        },
        ClientMessage: {
            type: String,
            required:true,
        },
        ClientLogo:{
            type: String,
        } 
        }
)
mongoose.model('OurClient', ClientModel);