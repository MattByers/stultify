var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var distance = require('gps-distance');
//var exports = module.exports = {}
var events;

var req = //function(){
  unirest.get("https://eventfinda-eventfinda-nz.p.mashape.com/events.json")
  .header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
  .header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
  .header("Accept", "application/json")
  .end(function (result) {
    events = result.body.events;
  });
  return events;
// }

function getEventsAroundPoint(lat, lon, rad) {
  toReturn = [];
  for(i = 0; i < events.length; i++){
    if(distance(lat, lon, events[i].point.lat, events[i].point.lng) < rad){
      toReturn.push(events[i]);
    }
  }
  return toReturn;
}

function printEvents(events){
  for(i = 0; i < events.length; i++){
    console.log(events[i].name);
  }
}

function printAllEvents(){
  for(i = 0; i < events.length; i++){
    console.log(events[i]);
  }
}

function findParents(){
  for(i = 0; i < events.length; i++){
    console.log("id" + i + " :" + events[i].category.parent_id);
    console.log("name" + i + " :" + events[i].category.name);

  }
}

module.exports = router;
