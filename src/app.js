const express = require ("express");
const app = express();
const path = require ("path");
const hbs = require ("hbs");
const geoCode = require("./utils/geoCode.js");
const forecast = require("./utils/forecast.js")
// Define paths for Express Config
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialPath = path.join(__dirname,"../templates/partials");
// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath);
hbs.registerPartials(partialPath);
// Setup static directory to use
app.use(express.static(publicDirectoryPath))
// Routing
app.get("/",(req,res) => {
    res.render("index",{
        title: "Totoro Weather Station",
        message: "Totoro is so HAPPYYYY to help you find out about the weather",
        name: "Totoro - Your <3 neighbour"
    })
})
app.get("/about",(req,res) => {
    res.render("about",{
        title: "About Me",
        message: "My name is Totoro - Your Lovely Neighbor",
        name: "Totoro - Your <3 neighbour"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({error: "ERROR: The Address must be provided."});
    }
    geoCode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error){
            return res.send( error);
        }
        forecast(latitude,longtitude, (error, data1) => {
           if(error){
            return res.send( error);
           }
           res.send({
            address: req.query.address,
            location: location,
            forecast: data1
            });
 
        })
    })
    
})

app.get("/help",(req,res) => {
    res.render("help", {
        title: "Place to Find Help",
        message: "I am here to help you, my friend :)",
        name: "Totoro - Your <3 neighbour"

    })
})
app.get("/help/*",(req,res) => {
    res.render("error",{
        title: "ERROR",
        error: "Help Article Not Found",
        name: "Totoro - Your <3 neighbour"
    })
})
app.get("*", (req, res) => {
    res.render("error",{
        title: "ERROR",
        error: "404 Page",
        name: "Totoro - Your <3 neighbour"
    })
})
app.listen(port,() => {
    console.log("Server is up on port "+port)
})