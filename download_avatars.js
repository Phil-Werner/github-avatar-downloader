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

    cb(err, dataObj);
  });
}

function downloadImageByURL(url, filePath) {

  request.get(url).on('error', function(err) {
    throw err;
  })
  .pipe(fs.createWriteStream('./' + filePath));
}

console.log("Welcome to the GitHub Avatar Downloader");

var args = process.argv.slice(2);

if (args[0] && args[1]) {

  getRepoContributors(args[0], args[1], function(err, result) {
    console.log("Errors:", err);

    for (var x = 0; x < result.length; x++) {
      downloadImageByURL(result[x]['avatar_url'], 'avatars/' + result[x]['login'] + '.jpg');
    }
  });
}

else {

  console.log("Unable to comply.  You must enter two command line arguments.  Quitting!")
}
