const request=require('request'); //importing request module for accessing the required site
const cheerio=require('cheerio');  //importing cheerio module to load the body of the website

let url='https://www.espncricinfo.com/series/ipl-2020-21-1210595' //target site

request(url, cb);    //calling request function to fetch the url

function cb(error,statusCode,body){  //call back function of request module i.e. cb
    if(error){                            // if url not found or bad request
        console.log(error)
    }
    else{
        extractLink(body);             // if url exist call the findHtml function
    }
}
function  extractLink(html)            //will load the website of espn -> view all results
{
   let selTool=cheerio.load(html);
   let anchElem=selTool('a[data-hover="View All Results"]')
   let href=anchElem.attr('href')
   let fullLink='https://www.espncricinfo.com/'+href;
   getAllMatchLink(fullLink);
  // console.log(fullLink);
}

function getAllMatchLink(site){
     request(site,function(error,statusCode,body){
         if(error){
             console.log(error);
         }
         else{
             getScoreCard(body);
         }
     })
}
function getScoreCard(sites){
    let selTool=cheerio.load(sites);
    let scoreCardArray=selTool('a[data-hover="Scorecard"]');
    console.log(scoreCardArray.text())
    for(let i=0;i<scoreCardArray.length;i++){
        let allLink=selTool(scoreCardArray[i]).attr('href');
        let scorecardlink='https://www.espncricinfo.com/'+allLink;
        console.log(scorecardlink)
    }
}