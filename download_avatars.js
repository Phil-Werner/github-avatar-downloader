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

    dataObj = JSON.parse(body);  //Takes in the body of the get request, then
                                // parses the data into JSON and sets dataObj equal to it
    cb(err, dataObj);
  });
}

/* This function takes in a url and filepath as parameters.  It then
performs a get request on the url, and then pipes the data it receives
to the given file path. */


function downloadImageByURL(url, filePath) {

  request.get(url).on('error', function(err) {
    throw err;
  })
  .pipe(fs.createWriteStream('./' + filePath));
}

console.log("Welcome to the GitHub Avatar Downloader");

/* Here we check if the avatars directory doesn't exist yet,
in which case we create it */

if (!fs.existsSync('avatars')) {
  fs.mkdirSync('avatars');
}

var args = process.argv.slice(2);

/* Here we check to make sure there are two arguements before continuing. */

if (args[0] && args[1]) {

  getRepoContributors(args[0], args[1], function(err, result) {
    console.log("Errors:", err);

/* The for loop goes through each result and calls downloadImageByUrl
  with each constructed url and output path  */

    for (var x = 0; x < result.length; x++) {
      downloadImageByURL(result[x]['avatar_url'], 'avatars/' + result[x]['login'] + '.jpg');
    }
  });
}

else {

  console.log("Unable to comply.  You must enter two command line arguments.  Quitting!")
}
