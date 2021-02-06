// importing mongoose module
const mongoose = require('mongoose')
const moment= require('moment')
// import schema 
const Schema = mongoose.Schema;

let NewHireApplication = new Schema(
    {
        ApplicationId: {
            type: String,
            required:true,
            unique: true
        },
        FirstName: {
            type: String,
        },
        LastName: {
            type: String,
        }, 
        ContactNo: {
            type: Number,
            required:true,
        },
        Email: {
            type: String,
            required:true,
        },
        Experience:{
            type: Number
        },
        Message:{
            type: String
        },
        Resume:{
            type: String,
            required:true, 
        },
        Vaccancyid:{
            type: String,
            required:true,
        }
    }
)

mongoose.model('HiringApplication', NewHireApplication);