//STOCK MARKET PORTFOLIO APP BY PB
// CTRL+C = Terminal break

//1. EXPRESS - require express, initialize it
const express = require("express");
const app = express();

//4.1 HANDLEBARS - require handlebars 
const exphbs = require("express-handlebars");

//3.2. STATIC ROUTING set path variable for static routing
const path = require("path");

//2.1 PORTS - define ports
//process.env.PORT calls the hosting's platform defined port, which is stored in an environmental variable
// || 5000 if there are no settings
const PORT = process.env.PORT || 5000;

//2.2 PORTS - set app to listen to ports
app.listen(PORT);
console.log("Server listening on port: " + PORT);


//MIDDLEWARE
//4.2 HANDLEBARS - set handlebars middleware
app.engine("handlebars", exphbs.engine()); //instantiates the engine "handlebars"
app.set("view engine","handlebars"); //sets the engine handlebars as the view-engine
app.set("views", "./views");


const otherstuff = "hello there, this is other stuff";

//***ROUTE SYSTEM***
//4.3 HANDLEBARS - Set handlebars routes
app.get("/", function(req, res)
{
	res.render("home", {stuff: otherstuff});
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