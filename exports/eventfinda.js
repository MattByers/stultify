var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var distance = require('gps-distance');
var exports = module.exports = {}

exports.getEvents = function(callback){
  unirest.get("https://eventfinda-eventfinda-nz.p.mashape.com/events.json")
  .header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
  .header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
  .header("Accept", "application/json")
  .end(function (result) {
    callback(result.body.events);
  });
}

exports.getEventsAroundPoint = function(lat, lon, rad, events, callback) {
  toReturn = [];
  for(i = 0; i < eventArray.length; i++){
    if(distance(lat, lon, events[i].point.lat, events[i].point.lng) < rad){
      toReturn.push(events[i]);
    }
  }
  callback(toReturn);
}

exports.printEvents = function(events){
  for(i = 0; i < events.length; i++){
    console.log(events[i].name);
  }
}

exports.findAllParents = function(events){
  for(i = 0; i < events.length; i++){
    console.log("id" + i + " :" + events[i].category.parent_id);
    console.log("name" + i + " :" + events[i].category.name);
  }
}