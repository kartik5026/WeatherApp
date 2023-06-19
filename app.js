const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const https = require("https");

const apiKey = "18c5f4478e8bc01ed1301f2b444ed387"

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/checkWeather",(req,res)=>{
    var city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"
    
    
    https.get(url,(response)=>{
        
        response.on("data",(data)=>{
            
            var weatherData =   JSON.parse(data);
            var status = weatherData.cod;
            if(status==200){
            var temp = weatherData.main.temp
            var desc = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var image = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Temperate in "+city+" is "+temp+" degree celcius </h1>");
            res.write("<h1> Weather : "+desc+"<h1>");
            res.write("<img src="+image+">");
            res.sendFile(__dirname+"/bootstrap.html");
            res.end();
            }
            else{
                res.sendFile(__dirname+"/failure.html")
            }
        })
    })
    
})  

app.post("/",(req,res)=>{
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Running on server 3000");
})