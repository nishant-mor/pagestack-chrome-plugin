
document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('savepage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

    var http = new XMLHttpRequest();
    var url = "http://pagestack.ml/api/insert";
    http.open("POST" , url , true);
    http.setRequestHeader("Content-type" ,"application/json");
    var data = JSON.stringify({"url_name":tab.url});
    http.send(data);
    console.log(tab.url);


    });
  });
});