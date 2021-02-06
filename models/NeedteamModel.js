// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let NeedTeamModel = new Schema(
    {
        id: {
            type: String,
            unique: true
        },
        ProjectDescription: {
            type: String,
        },
        Budget: {
            type: Number,
        },
        StartDate: {
            type: Date
        },
        ContactNo: {
            type: Number,
        },
        Email: {
            type: String,
            //required:true,
        },
        Developers:[{
            Devid:{type:String},
            hrDay:{type:String},
            duration:{type:String},
            experience:{type:String},
            noOfDeveloper:{type:String}
        }]
        ,
        Attachment: 
          [{
            type: String,
           // required:true,
          }]   
    }
)

mongoose.model('NeedTeam', NeedTeamModel);

