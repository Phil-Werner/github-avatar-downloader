var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {

  request.get(url).on('error', function(err) {

    throw err;
  })
  .pipe(fs.createWriteStream('./' + filePath));
}



// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);

//   console.log(result.length);

//   for (var x = 0; x < result.length; x++) {

//     console.log(result[x]['avatar_url']);

//   }

// });

console.log("Welcome to the GitHub Avatar Downloader");

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")