var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var distance = require('gps-distance');
var moment = require('moment');
var exports = module.exports = {};

var startDate = function(){
  millis = Date.now();
  millis = moment(millis);
  toReturn = millis.format("YYYY-MM-DD HH:mm:ss");
  return toReturn;
};

var endDate = function(){
  millis = Date.now() + 24 * 3600 * 1000 * 1;
  millis = moment(millis);
  toReturn = millis.format("YYYY-MM-DD HH:mm:ss");
  return toReturn;
};

var urlStart = "http://api.eventfinda.co.nz/v2/events.json?fields=event:(url,name,description,datetime_start,datetime_end,point,category)&start_date="+startDate()+"&end_date="+endDate();

var getEvents = function(url, callback){
  unirest.get(url)
  .header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
  .header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
  .header("Accept", "application/json")
  .end(function (result) {
    if(!result){
      callback(null, new Error('Error finding results'));
    }
    else{
      console.log(urlStart);
      callback(result.body.events);
    }
   });
};





var getEventsByKeyWords = function(keywords, callback){
  var url = urlStart + "?autocomplete=" + keywords;
  unirest.get(url)
  .header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
  .header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
  .header("Accept", "application/json")
  .end(function (result) {
    if(!result){
      callback(null, new Error('Error finding results'));
    }
    else{
      callback(result.body.events);
    }
   });
};

exports.eventByID = function(id, callback){
  var url = urlStart + "id=" + id;
  unirest.get(url)
  .header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
  .header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
  .header("Accept", "application/json")
  .end(function (result) {
    if(!result){
      callback(null, new Error('Error finding results'));
    }
    else{
      callback(result.body.events);
    }
   });
};

exports.getFreeEvents = function(lat, lon, rad, callback){
  toReturn = [];
  getEvents(urlStart+"&free=1", function(events, error){
    if(error){
      callback(null, error);
    } else {
      for(i = 0; i < events.length; i++){
        if(distance(lat, lon, events[i].point.lat, events[i].point.lng) < rad){
          toReturn.push(events[i]);
        }
      }
      callback(toReturn);
    }
  });
};

exports.getEventsAroundPoint = function(lat, lon, rad, callback) {
  toReturn = [];
  getEvents(urlStart, function(events, error){
    if(error){
      callback(null, error);
    } else {
      for(i = 0; i < events.length; i++){
        if(distance(lat, lon, events[i].point.lat, events[i].point.lng) < rad){
          toReturn.push(events[i]);
        }
      }
      callback(toReturn);
    }
  });
};

exports.printEvents = function(events){
  for(i = 0; i < events.length; i++){
    console.log(events[i].name);
  }
};

exports.findAllParents = function(events){
  for(i = 0; i < events.length; i++){
    console.log("id" + i + " :" + events[i].category.parent_id);
    console.log("name" + i + " :" + events[i].category.name);
  }
};
