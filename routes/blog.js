const express = require('express')
const jwt = require('jsonwebtoken');

const blogController = require('./../controllers/blogcontroller')

const multer=require('multer')
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage,limits:{
//   fileSize:1024*1024*50
// } })
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
      console.log("file", file);
   callback(null, "./Uploads/");
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
});
let maxSize = 1000000 * 1000;
let upload = multer({
  storage: storage,
  limits: {
      fileSize: maxSize
  }
});

const appConfig = require("./../config/appconfig")
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUI=require('swagger-ui-express');

const app = express();
const options = {
	definition:{
	  info:{
		title:'Glory Swagger All API',
		version:'1.0.0',
    description:'',
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
	  },
	},
	apis:['./routes/*.js']
}

let setRouter = (app)=>{
   let baseUrl = appConfig.apiVersion+'';
   const swaggerSpec = swaggerJSDoc(options)
   app.use(baseUrl+'/api/swaggers', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(express.json());

/**
 * @swagger
 * definitions:
 *  getInTouch:
 *   type: object
 *   properties:
 *    Name:
 *     type: string
 *     description: name 
 *     example: 'Full Name'
 *    ContactNo:
 *     type: number
 *     description: contact Number
 *     example: '0123456789'
 *    Email:
 *     type: string
 *     description: email
 *     example: 'abc@abc.com'
 *    Message:
 *     type: string
 *     description: Message
 *     example: 'Message'
 *  hireapplication:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: Firs tName 
 *     example: 'First Name'
 *    LastName:
 *     type: string
 *     description: Last tName 
 *     example: 'Last Name'
 *    ContactNo:
 *     type: number
 *     description: contact Number
 *     example: '0123456789'
 *    Email:
 *     type: string
 *     description: email
 *     example: 'abc@abc.com'
 *    Experience:
 *     type: number
 *     description: Experience
 *     example: '5'
 *    Message:
 *     type: string
 *     description: Message
 *     example: 'Message'
 *    Vaccancyid:
 *     type: string
 *     description: Vaccancyid
 *     example: '1'
 *    Resume:
 *     type: string
 *     description: Resume
 *     example: '.pdf or .word file base64 string'
 *  AddNeedTeam:
 *   type: object
 *   properties:
 *    ProjectDescription:
 *     type: string
 *     description: ProjectDescription
 *     example: 'ProjectDescription'
 *    Budget:
 *     type: number
 *     description: Budget 
 *     example: '50,000'
 *    ContactNo:
 *     type: number
 *     description: contact Number
 *     example: '0123456789'
 *    Email:
 *     type: string
 *     description: email
 *     example: 'abc@abc.com'
 *    StartDate:
 *     type: date
 *     description: StartDate
 *     example: '04/09/1999'
 *    Developers:
 *     type: array
 *     description: Developers in array
 *     example: [{'Devid':id,'hrDay':hrday,'duration':duration,'experience':experience,'noOfDeveloper':noOfDeveloper}]
 *  NewProjectAdd:
 *   type: object
 *   properties:
 *    Projectid:
 *     type: string
 *     description: id 
 *     example: id
 *    ProjectName:
 *     type: string
 *     description: Projec tName 
 *     example: gfl
 *    ProjectDescription:
 *     type: string
 *     description: Project Description 
 *     example: abc
 *    Projectimage:
 *     type: array
 *     description: Projectimage in array 
 *     example: base64 string
 *    Projectvideo:
 *     type: array
 *     description: Projectvideo in array 
 *     example: base64 string
 */
 
/**
 * @swagger
 * /api/gloryweb/getDevelopersList:
 *   get:
 *     tags:
 *       - Developers
 *     description: Returns all developers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all developers
 */
app.get(baseUrl+'/getDevelopersList',blogController.getAllDevelopers);

/**
  * @swagger
  * /api/gloryweb/getDevelopersBySkill/{DevSkill}:
  *  get:
  *   tags:
  *    - Developers
  *   parameters:
  *    - in: path
  *      name: DevSkill
  *      required: true
  *      description: body of the get Developer By Skill
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.get(baseUrl+'/getDevelopersBySkill/:DevSkill/',blogController.getDevelopersBySkill);

// /**
//  * @swagger
//  * /api/gloryweb/getProjectList:
//  *   get:
//  *     tags:
//  *       - Projects
//  *     description: Returns all projects
//  *     produces:
//  *       - application/json
//  *     responses:
//  *       200:
//  *         description: An object of all projects
//  */   
// app.get(baseUrl+'/getProjectList',blogController.getAllProject);

/**
 * @swagger
 * /api/gloryweb/getprojectidnameimg:
 *   get:
 *     tags:
 *       - Projects
 *     description: Returns all project image name and id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all projects
 */
app.get(baseUrl+'/getprojectidnameimg',blogController.getprojectidnameimg);

 /**
  * @swagger
  * /api/gloryweb/getprojectbyid/{Projectid}:
  *  get:
  *   tags:
  *    - Projects
  *   parameters:
  *    - in: path
  *      name: Projectid
  *      required: true
  *      description: body of the project by id
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.get(baseUrl+'/getprojectbyid/:Projectid/',blogController.getprojectbyid);

/**
 * @swagger
 * /api/gloryweb/getServiceList:
 *   get:
 *     tags:
 *       - Service
 *     description: Returns all service
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all service
 */ 
app.get(baseUrl+'/getServiceList',blogController.getAllService);

 /**
  * @swagger
  * /api/gloryweb/getServiceByLimit/{limit}:
  *  get:
  *   tags:
  *    - Service
  *   parameters:
  *    - in: path
  *      name: limit
  *      description: Limit of responce
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
 app.get(baseUrl+'/getServiceByLimit/:limit',blogController.getServiceByLimit);

 /**
  * @swagger
  * /api/gloryweb/getInTouch:
  *  post:
  *   tags:
  *    - In Touch
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the get In Touch API
  *      schema:
  *       $ref: '#/definitions/getInTouch'
  *   requestBody:
  *    content:
  *      application/x-www-form-urlencoded:
  *      schema:
  *       $ref: '#/definitions/getInTouch'
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.post(baseUrl+'/getInTouch',blogController.getInTouch);
   
/**
 * @swagger
 * /api/gloryweb/getClientList:
 *   get:
 *     tags:
 *       - Client
 *     description: Returns all client
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all client
 */ 
app.get(baseUrl+'/getClientList',blogController.getAllClient);
 
 /**
  * @swagger
  * /api/gloryweb/getVacancyById/{Vacancyid}:
  *  get:
  *   tags:
  *    - Vacancy
  *   parameters:
  *    - in: path
  *      name: Vacancyid
  *      type: string
  *      required: true
  *      description: body of the get Vacancy By Id
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.get(baseUrl+'/getVacancyById/:Vacancyid',blogController.getVacancyById);

/**
 * @swagger
 * /api/gloryweb/getVacancyList:
 *   get:
 *     tags:
 *       - Vacancy
 *     description: Returns all Vacancy
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all Vacancy
 */   
app.get(baseUrl+'/getVacancyList',blogController.getAllVacancy);
 
/**
  * @swagger
  * /api/gloryweb/hireapplication:
  *  post:
  *   tags:
  *    - Hire
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the hire application
  *      schema:
  *       $ref: '#/definitions/hireapplication'
  *   requestBody:
  *    content:
  *      application/x-www-form-urlencoded:
  *      schema:
  *       $ref: '#/definitions/hireapplication'
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.post(baseUrl+'/hireapplication',/*upload.single('Resume'),*/blogController.SubmitApplication); 

/**
  * @swagger
  * /api/gloryweb/AddNeedTeam:
  *  post:
  *   tags:
  *    - NeedTeam
  *   parameters:
  *    - in: body
  *      name: body
  *      required: true
  *      description: body of the AddNeedTeam
  *      schema:
  *       $ref: '#/definitions/AddNeedTeam'
  *   requestBody:
  *    content:
  *      application/x-www-form-urlencoded:
  *      schema:
  *       $ref: '#/definitions/AddNeedTeam'
  *   responses:
  *    200:
  *     description: succesfully
  *    500:
  *     description: failure 
  */
app.post(baseUrl+'/AddNeedTeam',blogController.AddNeedTeam); 

/**
 * @swagger
 * /api/gloryweb/getNeedTeam:
 *   get:
 *     tags:
 *       - NeedTeam
 *     description: Returns all NeedTeams
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An object of all NeedTeams
 */   
app.get(baseUrl+'/getNeedTeam',blogController.getNeedTeam);

app.post(baseUrl+'/NewProjectAdd'/*,upload.fields([{name : 'Projectimage',maxCount:6},{name:'Projectvideo',maxCount:2}])*/,upload.array("Projectimage", 6),blogController.NewProject);  
app.post(baseUrl+'/NewServiceAdd',upload.array("ServiceLogo", 6),blogController.NewService);  
}
module.exports = {
    setRouter: setRouter
}