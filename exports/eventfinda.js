var express = require('express');
var router = express.Router();
var unirest = require('unirest');

var data;

var request = unirest.get("https://eventfinda-eventfinda-nz.p.mashape.com/events.json")
.header("Authorization", "Basic bG9jYWxob3N0Mjp0cWNrbmpja2doYnY=")
.header("X-Mashape-Key", "Lv4F833PBpmshgpogHNJQN98NwKap12ojv9jsn6t5pzZypLeKh")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
