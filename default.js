

var hostname = "http://pagestack.ml"
var tablink , tabtitle;
chrome.tabs.getSelected(null,function(tab) {
    tablink = tab.url;
    tabtitle = tab.title;
});

console.log("jk0");

// check if user is logged in
var http= new XMLHttpRequest(); 
var url = hostname + "/api/isauthenticated";
console.log("ferg")
http.addEventListener("load", reqListener);
http.open("GET" , url , true);
http.send();

  

function reqListener() {
  console.log(this.responseText);

  response_json = JSON.parse(this.responseText);
  if(response_json.status==="true"){

    $('.username').html(response_json.email);
    console.log("clicked");

    var http2 = new XMLHttpRequest();
    var url2 = hostname + "/api/insert";
    http2.addEventListener("load", reqListener2);
    http2.open("POST" , url2 , true);
    http2.setRequestHeader("Content-type" ,"application/json");
    var data = JSON.stringify({"url_name":tablink , "title" : tabtitle});
    http2.send(data);


  }
  else{
    chrome.tabs.create({ url: hostname + "/login" });
  }
}


function reqListener2(){

  response_json = JSON.parse(this.responseText);

  $('.pagestatus').html("Page Saved");
  chrome.browserAction.setIcon({path:"/public/images/icon3_small.png"}); 

  // wait 2 seconds
  setTimeout(function () {
  window.close();
  }, 2000);

  console.log(tablink);
 }

