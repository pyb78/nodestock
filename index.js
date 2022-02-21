//STOCK MARKET PORTFOLIO APP BY PB
// CTRL+C = Terminal break

//1. EXPRESS - require express, initialize it
const express = require("express");
const app = express();

//4.1 HANDLEBARS - require handlebars 
const exphbs = require("express-handlebars");

//3.2. STATIC ROUTING set path variable for static routing
const path = require("path");

//6. API
const request = require("request");

//7.1
const bodyParser = require("body-parser");

//2.1 PORTS - define ports
//process.env.PORT calls the hosting's platform defined port, which is stored in an environmental variable
// || 5000 if there are no settings
const PORT = process.env.PORT || 5000;

//7.2 use body parser middleware
app.use(bodyParser.urlencoded({extended: false})); //calls the bodyparser module to un-encodes stuff from form


//2.2 PORTS - set app to listen to ports
app.listen(PORT);
console.log("Server listening on port: " + PORT);

//API KEY pk_86045304fff8493bb591d3ac8c8bedd8
//create call API function
function call_api(finishedAPI, ticker)
{

  request("https://cloud.iexapis.com/stable/stock/"+ ticker + "/quote?token=pk_86045304fff8493bb591d3ac8c8bedd8", {json: true}, (err,res,body) => {
   if(err)
   {
      return console.log(err);
   }
  
   if(res.statusCode === 200)
   {
      //console.log(body);
      finishedAPI(body);
   }
   });


};


//MIDDLEWARE
//4.2 HANDLEBARS - set handlebars middleware
app.engine("handlebars", exphbs.engine()); //instantiates the engine "handlebars"
app.set("view engine","handlebars"); //sets the engine handlebars as the view-engine
app.set("views", "./views");

const otherstuff = "hello there, this is other stuff";

//***ROUTE SYSTEM***
//4.3 HANDLEBARS - Set handlebars routes

//4.3.1 SET HANDLEBAR INDEX GET ROUTE (when index is just called)
app.get("/", function(req, res)
{
	//const api = call_api(); will not finish in time; we need callback function
   call_api(
   function(doneAPI)
   {
      res.render("home", {stock: doneAPI});
   },"fb"); //get needs to have a default
});

//4.3.1 SET HANDLEBAR INDEX POST ROUTE (when there is something posted to index)
app.post("/", function(req, res)
{
   //const api = call_api(); will not finish in time; we need callback function
   //simplified-> call_api("function", "req.body.stock_ticker)
   call_api(
   function(doneAPI)
   {
      //posted_stuff = req.body.stock_ticker;
      res.render("home", {stock: doneAPI});
   },
   req.body.stock_ticker); 
});
   

//5. create about page route
app.get("/about.html", function(req, res)
{
   res.render("about");
});



//***STATIC SYSTEM***
//3.1 STATIC ROUTING - Set static routing (public folder)
//__dirname = nodejs is environemnt variable that tells you the absolute path of the directory containing the currently executing file
app.use(express.static(path.join(__dirname,"public")));



//Relative referencing
/*
   = Root directory
   .   = This location
   ..  = Up a directory
   ./  = Current directory
   ../ = Parent of current directory
   ../../ = Two directories backwards
   */