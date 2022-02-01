// this is about to scrapp worldometer corona site to get valuable information from that site

const request = require('request');        //importing request module for accessing the required site
const cheerio=require('cheerio');          //importing cheerio module to load the body of the website
let url='https://www.worldometers.info/coronavirus/'   //target site address
request(url, cb);                //calling request modult to access the target site
function cb(error,statusCode,body)      //call back(cb) function for the request module
{ 
  if(error){                              // if url not found or bad request
      console.error('error:', error);
   }
   else{
    handleHtml(body);                //if url found call the handleHtml function and pass the accessed website
   } 
}

function handleHtml(html){
    let selTool=cheerio.load(html);             //using cheerio.load function to load the body of the site in the variable
    let contArr=selTool('.maincounter-number span');    //loading the part of the html containing class as maincounter-number and it's span to find totalcase, death and recovered data
    let totalCase=selTool(contArr[0]).text()          
    console.log('Total Cases: '+totalCase)      //print total corona cases
    let totalDeath=selTool(contArr[1]).text()
    console.log('Total Deaths: '+totalDeath)       //print total deaths cases
    let totalRec=selTool(contArr[2]).text()
    console.log('Total Recovery: '+totalRec)       //print total recovery cases
}