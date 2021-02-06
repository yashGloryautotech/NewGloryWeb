const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const _ = require("underscore");
const upload = require("../helper/helper").upload;
const vm = require("v-response");

const response = require('./../libs/resLib')

//Importing the model here 
const DevModel = mongoose.model('Developer');
const ProjectModel = mongoose.model('OurProject');
const ServiceModel = mongoose.model('OurService');
const GetInTouchModel = mongoose.model('GetInTouch');
const ClientModel = mongoose.model('OurClient');
const VacancyModel = mongoose.model('Vacancy');
const HireApplcationModel = mongoose.model('HiringApplication');
const NeedTeam = mongoose.model('NeedTeam');
var fs = require("fs");

let getAllDevList = (req, res) => {
    DevModel.find()
    .select('-__v -_id -DevName -DevEmail -ContactNo')
    .lean()
    .exec((err, resultAllDev) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Developer', 500)
                    res.send(apiResponse)
                } else if (resultAllDev == undefined || resultAllDev == null || resultAllDev == '') {
                    let apiResponse = response.generate(true, 'No Developer Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Our Developers', 200, resultAllDev)
                    res.send(apiResponse)
                }
            })
}

let getDevBySkill = (req, res) => {
    var DevSkill=req.params.DevSkill
    DevModel.find({"DevSkill":DevSkill},(err,resultDevBySkill)=>{   
        if(err)
        {
            let apiResponse = response.generate(true, 'Error', 500)
            res.send(apiResponse)
        }
        else if (resultDevBySkill == undefined || resultDevBySkill == null || resultDevBySkill == '') {
            let apiResponse = response.generate(true, 'No Skill Found', 404, null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'Developer by Skill', 200, resultDevBySkill);
            res.send(apiResponse)
        }
    })
}
let getprojectlist= (req, res) => {
    ProjectModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, resultAllProject) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Project', 500)
                    res.send(apiResponse)
                } else if (resultAllProject == undefined || resultAllProject == null || resultAllProject == '') {
                    let apiResponse = response.generate(true, 'No Project Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Our Projects', 200, resultAllProject)
                    res.send(apiResponse)
                }
            })
}
let getprojectidnameimg= (req, res) => {
    ProjectModel.find({},{"Projectimage":{$slice:1}})
    .select('-__v -_id ')
    .lean()
    .exec((err, resultAllProject) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Project', 500)
                    res.send(apiResponse)
                } else if (resultAllProject == undefined || resultAllProject == null || resultAllProject == '') {
                    let apiResponse = response.generate(true, 'No Project Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Our Projects', 200, resultAllProject)
                    res.send(apiResponse)
                }
            })
}


let getprojectbyid= (req, res) => {
    var id=req.params.Projectid
    ProjectModel.find({"Projectid":id},(err, resultProjectbyid) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Project', 500)
                    res.send(apiResponse)
                } else if (resultProjectbyid == undefined || resultProjectbyid == null || resultProjectbyid == '') {
                    let apiResponse = response.generate(true, 'No Project Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Projects by id', 200, resultProjectbyid)
                    res.send(apiResponse)
                }
            }).select('-__v -_id')
}

let newProject=async(req,res,next)=>{
    if (!req.files || _.isEmpty(req.files)) {
        return res.status(400)
            .json(vm.ApiResponse(false, 400, "No file uploaded'"))
    }
    const files = req.files;
    try {
        let urls = [];
        let multiple = async (path) => await upload(path);
        for (const file of files) {
            const {path} = file;
            console.log("path", file);
            const newPath = await multiple(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        if (urls) {
            let body = req.body;
            let bodyw = _.extend(body, {Projectimage: urls});
            let projectimg = new ProjectModel(bodyw);
            await projectimg.save()
                .then(saved => {
                    let apiResponse = response.generate(false, 'Project added', 200, saved)
                    res.send(apiResponse)   
                    //return res.json(saved);
                }).catch(error => {
                    let apiResponse = response.generate(true, 'Failed to add new project', 500, error)
                    res.send(apiResponse)
                    //return res.json(error);
                })
       }
        if (!urls) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, ""))
        }
    } catch (e) {
        console.log("err :", e);
        return next(e);
    }   
    // let projectimg = new ProjectModel({
    //     Projectid:    req.body.Projectid,
    //     ProjectName:         req.body.ProjectName,
    //     ProjectDescription:     req.body.ProjectDescription,
    //     Projectimage:           req.body.Projectimage,
    //     Projectvideo:           req.body.Projectvideo,
    //     Stack:                  req.body.Stack
    //     })
    //  // end new newapplication model
    // projectimg.save((err, result) => {
    //     if (err) {
    //         console.log(err)
    //         let apiResponse = response.generate(true, 'Failed to add new project', 500, null)
    //         res.send(apiResponse)
    //     } else {
    //         let apiResponse = response.generate(false, 'Project added', 200, result)
    //         res.send(apiResponse)   
    //     }
    // })
};

let newService=async(req,res,next)=>{
    if (!req.files || _.isEmpty(req.files)) {
        return res.status(400)
            .json(vm.ApiResponse(false, 400, "No file uploaded'"))
    }
    const files = req.files;
    try {
        let urls = [];
        let multiple = async (path) => await upload(path);
        for (const file of files) {
            const {path} = file;
            console.log("path", file);
            const newPath = await multiple(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }
        if (urls) {
            let body = req.body;
            let bodyw = _.extend(body, {ServiceLogo: urls});
            let serviceimg = new ServiceModel(bodyw);
            await serviceimg.save()
                .then(saved => {
                    let apiResponse = response.generate(false, 'Service added', 200, saved)
                    res.send(apiResponse)   
                    //return res.json(saved);
                }).catch(error => {
                    let apiResponse = response.generate(true, 'Failed to add new Service', 500, error)
                    res.send(apiResponse)
                    //return res.json(error);
                })
       }
        if (!urls) {
            return res.status(400)
                .json(vm.ApiResponse(false, 400, ""))
        }
    } catch (e) {
        console.log("err :", e);
        return next(e);
    }
};   
let getServiceList= (req, res) => {
    ServiceModel.find()
    .select('-__v -_id -ServiceImage -ServiceDescription -Serviceid')
    .lean()
    .exec((err, resultAllService) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Service', 500)
                       res.send(apiResponse)
                } else if (resultAllService == undefined || resultAllService == null || resultAllService == '') {
                    let apiResponse = response.generate(true, 'No Service Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Our Services', 200, resultAllService)
                    res.send(apiResponse)
                }
            })
}

let getServiceByLimit= (req, res) => {
    var c=req.params.limit;
    console.log(c);
    ServiceModel.find().limit(parseInt(c))
    .select('-__v -_id -ServiceLogo -Serviceid -ServiceDescription')
    .lean()
    .exec((err, resultAllService) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Service', 500)
                       res.send(apiResponse)
                } else if (resultAllService == undefined || resultAllService == null || resultAllService == '') {
                    let apiResponse = response.generate(true, 'No Service Found', 404, null)
                    res.send(apiResponse)
                } else {
                    
                    let apiResponse = response.generate(false, 'Our Services', 200, resultAllService)
                    res.send(apiResponse)
                }
            })
}

let getInTouch= (req, res) => {
    let id=shortid.generate()
    let newgetInTouch = new GetInTouchModel({
        id:    id,
        Name:         req.body.Name,
        ContactNo:     req.body.ContactNo,
        Email:        req.body.Email,
        Message:        req.body.Message,
    }) // end new newapplication model
    newgetInTouch.save((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed to get In Touch', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Submitted', 200, result)
            res.send(apiResponse)
        }
    })  // end new blog save
}
let getClientList= (req, res) => {
    ClientModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, resultAllClient) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Client', 500)
                       res.send(apiResponse)
                } else if (resultAllClient == undefined || resultAllClient == null || resultAllClient == '') {
                    let apiResponse = response.generate(true, 'No Client Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Our Clients', 200, resultAllClient)
                    res.send(apiResponse)
                }
            })
}
let getVacancyList= (req, res) => {
    VacancyModel.find()
    .select('-__v -_id -JobResponsibility -Skill -NoOfOpening -Pearks -WhoCanApply -Experience')
    .lean()
    .exec((err, resultAllVacancy) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get Vacancy list', 500)
                       res.send(apiResponse)
                } else if (resultAllVacancy == undefined || resultAllVacancy == null || resultAllVacancy == '') {
                    let apiResponse = response.generate(true, 'No Vacancy Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Vacancys', 200, resultAllVacancy)
                    res.send(apiResponse)
                }
            })
}
let getVacancyById= (req, res) => {
    var Vacancyid=req.params.Vacancyid
    VacancyModel.find({"Vacancyid":Vacancyid},(err,resultDevById)=>{   
        if(err)
        {
            let apiResponse = response.generate(true, 'Error', 500)
            res.send(apiResponse)
        }
        else if (resultDevById == undefined || resultDevById == null || resultDevById == '') {
            let apiResponse = response.generate(true, 'No Vacancy Found', 404, null)
            res.send(apiResponse)
        }
        else{
            let apiResponse = response.generate(false, 'Vacancy by id', 200, resultDevById);
            res.send(apiResponse)
        }
    }).select('-__v -_id')
}
let NewApplication = (req, res) => {
        
    let ApplicationId=shortid.generate()
    let newapplication = new HireApplcationModel({
        ApplicationId:    ApplicationId,
        FirstName:         req.body.FirstName,
        LastName:        req.body.LastName,
        ContactNo:     req.body.ContactNo,
        Email:        req.body.Email,
        Experience:        req.body.Experience,
        Message:      req.body.Message,
        Vaccancyid:        req.body.Vaccancyid,
        Resume:req.body.Resume
    }) // end new newapplication model
    newapplication.save((err, result) => {
        if (err) {
            console.log(err)
            let apiResponse = response.generate(true, 'Failed to Submit Application', 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Application Submited', 200, result)
            res.send(apiResponse)
        }
    })  // end new blog save
}
let AddNeedTeam = (req, res) => {
    let id = shortid.generate()
    let newBlog = new NeedTeam({
        id: id,
        ProjectDescription: req.body.ProjectDescription,
        Budget: req.body.Budget,
        StartDate: req.body.StartDate,
        ContactNo: req.body.ContactNo,
        Email: req.body.Email,
        Attachment:req.body.Attachment
        })
    // end new blog model
    newBlog.Developers = req.body.Developers
    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            res.send(result)
        }
    }) // end new blog save
}
let getNeedTeam= (req, res) => {
    NeedTeam.find()
    .select('-__v -_id')
    .lean()
    .exec((err, resultgetNeedTeam) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed to get all Need Teams', 500)
                       res.send(apiResponse)
                } else if (resultgetNeedTeam == undefined || resultgetNeedTeam == null || resultgetNeedTeam == '') {
                    let apiResponse = response.generate(true, 'No Teams Found', 404, null)
                    res.send(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Need Teams', 200, resultgetNeedTeam)
                    res.send(apiResponse)
                }
            })
}
    module.exports = {
        getAllDevelopers:getAllDevList,
        getDevelopersBySkill:getDevBySkill,
        getAllProject:getprojectlist,
        getAllService:getServiceList,
        getServiceByLimit:getServiceByLimit,
        //getAllInTouch:getInTouchList,
        getInTouch:getInTouch,
        getAllClient:getClientList,
        getAllVacancy:getVacancyList,
        getVacancyById:getVacancyById,
        SubmitApplication:NewApplication,
        getprojectbyid:getprojectbyid,
        getprojectidnameimg:getprojectidnameimg,
        AddNeedTeam:AddNeedTeam,
        getNeedTeam:getNeedTeam,
        NewProject:newProject,
        NewService:newService,
 }

