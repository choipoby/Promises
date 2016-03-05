var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Promise = require('promise');

/*
 * Example 1.
 */
function quotePrice()
{
  return new Promise(function(resolve, reject){
    var requestURL =
      "https://finance.yahoo.com/webservice/v1/symbols/"
      + "NFLX"
      + "/quote?format=json&view=detail";

    var request = new XMLHttpRequest();
    request.open("GET", requestURL, false);
    request.onreadystatechange = function(){
      if (request.readyState==4 && request.status==200) {
        var responseAsString = request.responseText;
        var responseAsArray = JSON.parse(responseAsString);
        var responseAsObject = responseAsArray.list.resources[0].resource;
        var priceLast = parseFloat(responseAsObject.fields.price);
        resolve(priceLast);
      } else {
        reject("could not get data");
      }
    }
    request.send();
  });
}

function showPrice(price)
{
  console.log("price for NFLX is " + price );
}

function showError(error)
{
  console.log("error caused because: " + err);
}

function example1()
{
  return quotePrice().then(function(price){showPrice(price);}).catch(function(err){showError(err);});
}

/*
 * Example 2
 */
var stocks = ["NFLX", "CSCO", "EBAY"];
var urlPrefix = "https://finance.yahoo.com/webservice/v1/symbols/";
var urlPostfix =  "/quote?format=json&view=detail";
var stockQuoteUrls = stocks.map(function(ticker){ return urlPrefix + ticker + urlPostfix;});
//var stockQuoteUrls = stocks.map(ticker => (urlPrefix + ticker + urlPostfix));

function quoteStocksParallel()
{
  //stockQuoteUrls.forEach(function(url){console.log(url);});
  var requests = stockQuoteUrls.map(function(url){
    return new Promise(function(resolve, reject){
      var request = new XMLHttpRequest();
      //console.log("requesting " + url);
      request.open("GET", url, false);
      request.onreadystatechange = function(){
        if (request.readyState==4 && request.status==200) {
          var responseAsString = request.responseText;
          var responseAsArray = JSON.parse(responseAsString);
          var responseAsObject = responseAsArray.list.resources[0].resource;
          var priceLast = parseFloat(responseAsObject.fields.price);
          //console.log(priceLast);
          resolve(priceLast);
        } else {
          reject("could not get data");
        }
      }
      request.send();
    });
  });

  Promise.all(requests)
  .then(function(value) { console.log(value); }, function(reason) {console.log(reason)});
}

function example2(){
  return quoteStocksParallel();
}

/*
 * Example 3
 */
function quoteStocksParallel2()
{
    stockQuoteUrls.forEach(function(url){
      getInfo(url).then(function(price){
          console.log("price ----> : " + price);
      });
    });

    function getInfo(url){
      //console.log(url);
      return new Promise(function(resolve, reject){
        var request = new XMLHttpRequest();
        //console.log("requesting " + url);
        request.open("GET", url, false);
        request.onreadystatechange = function(){
          if (request.readyState==4 && request.status==200) {
            var responseAsString = request.responseText;
            var responseAsArray = JSON.parse(responseAsString);
            var responseAsObject = responseAsArray.list.resources[0].resource;
            var priceLast = parseFloat(responseAsObject.fields.price);
            //console.log(priceLast);
            resolve(priceLast);
          } else {
            reject("could not get data");
          }
        }
        request.send();
      });
    }
}

function example3()
{
  quoteStocksParallel2();
}

function log(string)
{
  console.log(string + " ==========================");
}
/*
 * Main application sequence
 */

Promise.resolve("Start Application")
.then(function(string){console.log(string);})
.then(function(){log("Example 1"); example1();})
.then(function(){log("Example 2"); example2();})
.then(function(){log("Example 3"); example3();})
.catch(function(string){log("error " + string);})
