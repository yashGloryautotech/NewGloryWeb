// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;
let VacancyModel = new Schema(
    {
        Vacancyid: {
            type: String,
            required:true,
            unique: true
        },
        VacancyName: {
            type: String,
            required:true,
        },
        VacancyDesc:{
            type: String,
            required:true,
        },
        JobResponsibility: [],
        Skill:[],
        NoOfOpening: {
            type: Number,
            required:true,
        },
        Pearks:[],
        WhoCanApply:[],
        Experience:{ 
            type: String,
        }

        }
)
mongoose.model('Vacancy', VacancyModel);