// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let ProjectModel = new Schema(
    {
        Projectid: {
            type: String,
            required:true,
            unique:true
        },
        ProjectName: {
            type: String,
        },
        ProjectDescription: {
            type: String,
        },
        Projectimage: {type: []},
        Projectvideo: {type:[]},
        Stack:[    
        ]
        }
)
mongoose.model('OurProject', ProjectModel);