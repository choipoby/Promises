var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Promise = require('promise');

function PromiseToGetGreeting()
{
  console.log("PromiseToGetGreeting");
  return new Promise(function(resolve, reject){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/helloWorld", true);
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        string=xmlhttp.responseText;
        //console.log(string);
        resolve(string);
      }
    }
    xmlhttp.send();
   });
};

function GetGreeting()
{
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","http://localhost:8080/helloWorld", true);
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      string=xmlhttp.responseText;
      //console.log(string);
    }
  }
  xmlhttp.send();
};

function HelloWorld(string)
{
  console.log(string);
  return string + " and Goodbye World!";
}

function WhichWorld(string)
{
  if(string === undefined){
    return Promise.reject("Bad World!");
  }else{
    return Promise.resolve("Good World!");
  }
}

// orderly
/*
PromiseToGetGreeting()
.then(function(string){return HelloWorld(string);}) // HelloWorld does not return the Promise. If so, function in then will be called rightaway
.then(function(string){ HelloWorld(string);}) // what happens if you don't return HelloWorld?
.then(function(string){return WhichWorld(string);})
.then(function(string){console.log(string);}, function(string){console.log(string);});
*/

//HelloWorld("Hello World!").then(function(string){HelloWorld(string);})


// orderly
//PromiseToGetGreeting().then(function(){GoodbyeWorld(string);});

// out of order
//GetGreeting();
//GoodbyeWorld();

Promise
.reject("error happend")
.then(function(string){console.log(string);})
.then(function(string){console.log("hello?");})
.catch(function(string){console.log(string);});

Promise
.resolve("no error happend")
.then(function(string){console.log(string);})
.then(function(string){console.log("hello?");})
.catch(function(string){console.log(string);});


/*
try{ ...
}catch{ ...
}
 try/catch는 synchronous 한 콜에서나 사용되는 것이다. Asynchronous에서는 쓸수 없다.

*/
