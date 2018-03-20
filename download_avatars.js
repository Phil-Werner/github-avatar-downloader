var request = require('request');
var secret = require('./secrets.js');

function getRepoContributors(repoOwner, repoName, cb) {

  var dataObj = {};

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {

    dataObj = JSON.parse(body);

    //console.log(dataObj);


    cb(err, dataObj);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);

  console.log(result.length);

  for (var x = 0; x < result.length; x++) {

    console.log(result[x]['avatar_url']);

  }

});

console.log("Welcome to the GitHub Avatar Downloader");