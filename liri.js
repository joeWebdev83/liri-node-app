//initialize packets
require("dotenv").config();
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment");
const fs = require("fs");
const Spotify = require("node-spotify-api");

//displays input and controls spacing
const operation = process.argv[2];
const info = process.argv.slice(3).join(" ");

//App Logic
switch (operation) {
 case "concert-this": {
   concerts();
   break;
 }
 case "movie-this": {
   movies();
   break;
 }

 case "spotify-this-song": {
   songs();
   break;
 }

 case "do-what-it-says": {
   whatever();
   break;
 }
 default: {
   console.log("I don't understand what you want");
 }
}

//Functions for each case
function concerts() {
 const concertApi =
   "https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp";

 axios.get(concertApi).then(function(response) {
   var obj = response.data;
   if(!error){
   for (i = 0; i < 5; i++) {
     //console.log(response[i])
     console.log("******************************************");
     console.log("Venue: " + obj[i].venue.name);
     console.log("Country: " + obj[i].venue.country);
     console.log("City: " + obj[i].venue.city);
     console.log("Date " + moment(obj[i].datetime).format("l"));
   }
 } else {
   console.log ("Concert not found!")
 }
 });
}

function songs(){
 const spotify = new Spotify({
       id: keys.spotify.id,
       secret: keys.spotify.secret
     });

     spotify.search({ type: "track", query: info }, function(err, data) {
       if (!err) {
     for(var i = 0; i < data.tracks.items.length; i++){
         var songData = data.tracks.items[i];
                   //artist
         console.log("Artist: " + songData.artists[0].name);
                   //song name
         console.log("Song: " + songData.name);
                   //spotify preview link
         console.log("Preview URL: " + songData.preview_url);
                   //album name
         console.log("Album: " + songData.album.name);
         console.log("------------------------------------------------------------------------------");
         }
       }
       else{
         console.log('Error occurred.');
       }

       });

     }

function movies() {
 const movieApi =
   "http://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy";

 axios.get(movieApi).then(function(response) {
   const film = response.data;
   // console.log(response.data);

   console.log("Movie Tittle: "+ film.Title);
   console.log("Year: " + film.Year);
   console.log("Rating: " + film.imdbRating);
   console.log("Rotten Tomatoes: " + film.Ratings[1].Value);
   console.log("Country: " + film.Country);
   console.log("Language: " + film.Language);
   console.log("Plot: " + film.Plot);
   console.log("Actors: " + film.Actors);
 });
}

