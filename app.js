/**
 * @file app.js
 * The starting point of the application.
 * Express allows us to configure our app and use
 * dependency injection to add it to the http server.
 * 
 * The server-side app starts and begins listening for events.
 **/
const http = require('http')  // use require to import the Node.js http package
const express = require('express')  // require Express framework
const app = express()  // create an Express web app
const server = http.createServer(app)  // pass in the Express app to our http server
const path = require('path')

const hostname = '0.0.0.0'    // allows access from remote computers
const port = 3004;

// initialize data ............................................
require('./utils/seeder.js')(app)  // load seed data

// By default, Express does not serve static files. 
// Configure middleware with app.use
// use '/public to access files in the 'public' folder
app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
})
app.get('/index',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
})
app.get('/section1',function(req,res){
  res.sendFile(path.join(__dirname+'/public/section1.html'));
})
app.get('/section2',function(req,res){
  res.sendFile(path.join(__dirname+'/public/section2.html'));
})
app.get('/section3',function(req,res){
  res.sendFile(path.join(__dirname+'/public/section3.html'));
})

const routing = require('./routes/router.js')
app.use('/', routing)  // load routing

server.listen(port, hostname, () => {
  // Tell the user where to find the app (use backtics with variables)
  console.log(`App running at http://${hostname}:${port}/`)
  console.log('Press CTRL-C to stop\n')
})