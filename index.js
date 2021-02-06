const express= require('express')
const mongoose = require('mongoose')
const appConfig = require('./config/appconfig')

const cookieparser=require('cookie-parser')
const bodyparser=require('body-parser')
const swaggerUI=require('swagger-ui-express')
const cors=require('cors')

//declaring an instance or creating an application instance
const app=express()

app.use(cors());
app.use(bodyparser.json({limit:'50mb'}))

app.use(bodyparser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cookieparser())


const fs = require('fs')

// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(modelsPath+'/'+file)
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models

// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

//listening the server - creating a local server
app.listen(appConfig.port, () => {
    console.log('Run')
      let db= mongoose.connect(appConfig.db.uri , {useUnifiedTopology: true, useNewUrlParser:true,useCreateIndex:true});
      mongoose.connection.on('error',function error(err)
      {
        console.log("Database error");
        console.log(err);
      });
      mongoose.connection.on('open',function open(err)
      {
      if(err)
        {
          console.log("Database error");
          console.log(err);
        }
        else{
          console.log("Database connection success");
        }
      })
}); // end mongoose connection open handler
