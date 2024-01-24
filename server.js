const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const axios = require("axios");
const app = express();

const key = process.env.API_KEY

//set engine to view ejs
app.set("view engine", "ejs")

//serve public folder as static file
app.use(express.static("public"));

//Render the index with default values of weather and error
app.get("/", (req, res) => {
    res.render("index", {weather: null, error: null})
});

// the /weather route
app.get("/weather", async(req,res) => {
    //check if city name is provided in query params
    const city = req.query.city;

    //fetch weather data from API

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}` 

    let weather;
    let error = null
    try {
        const response = await axios.get(API_URL)
        weather= response.data
    } catch (error) {
        weather = null
        error = 'Try Again'
    }

    //Render index with the weather data and error message
    res.render("index", {weather, error});
});

//server START
const PORT = process.env. PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`App is running on port ${PORT}` )
});