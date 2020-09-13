var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const fetch = require("node-fetch");
var config = require('./config');

app.use(bodyParser.json());

app.get('/search', (req,res) => {

    //getting what kind of gif & how many gif are needed from user.
    var search_gif_name = req.body.gif_name;
    var gif_count = req.body.gif_count;
    
    //requesting to GIPHY API 
    var url = "http://api.giphy.com/v1/gifs/search";
    var query = "?q=" + search_gif_name;
    var api_key = "&api_key=" + config.api_key;
    var limit = "&limit=" + gif_count;
    var search_url = url + query + api_key + limit;
    
    fetch(search_url)
    .then(res => res.json())
    .then((search) => {
        var array_of_gifs =[] 
        for(var  i = 0; i < search.data.length; i++){
            array_of_gifs.push(search.data[i].images.original.url);
        }
        res.send(array_of_gifs);
    })
    .catch(err => { throw err });
})

app.listen(3000, ()=>{
    console.log("Server  running on port 3000");
})