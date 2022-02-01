// this is about scrapping espncricinfo website for information as last ball comment of the

const request=require('request'); //importing request module for accessing the required site
const cheerio=require('cheerio');  //importing cheerio module to load the body of the website

let url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary' //target site
request(url, cb); //calling request function

function cb(error,statusCode,body){  //call back function of request module i.e. cb
    if(error){                            // if url not found or bad request
        console.log(error)
    }
    else{
        findHtml(body);             // if url exist call the findHtml function
    }
}
function findHtml(html){
    let selTool=cheerio.load(html)             //using cheerio.load function  to load the recieved body of the website 
    let lastBallComment=selTool('.match-comment-wrapper .match-comment-long-text p'); //loading the content of html with class as .match-comment-wrapper ->.match-comment-long-text ->p
    let lastBallCommentData=selTool(lastBallComment[0]).text()  //using to access the last ball commentry stored in the array lastBallComment
    console.log('last ball comment as: '+lastBallCommentData)    //print the last ball commentry
}