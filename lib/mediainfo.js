var child_process = require("child_process"),
  parseString = require('xml2js').parseString,
  Q = require('q');

module.exports = function() {
  var deferred = Q.defer();
  var files = Array.prototype.slice.apply(arguments);

  // execute mediainfo and get XML output
  child_process.execFile("mediainfo", ["--Output=XML"].concat(files), function(err, stdout, stderr) {

    // Reject error if get executing mediainfo command
    if (err) {
      deferred.reject({
        error: err,
        stdout: stdout
      });
      return;
    }

    var trackJSON = {}; // hold individual track JSON data
    var tracks = []; // hold all tracks JSON object
    var trackList; // hold track JSON in list

    parseString(stdout, function(error, XmltoJSResult) {
      XmltoJSResult.Mediainfo.File.forEach(function(fileObj) {
        var tmpTrack;
        trackList = [];
        trackJSON = {};
        fileObj.track.forEach(function(trackObj) {
          var tmpTrackJSON = {};
          for (var key in trackObj) {
            if (key !== "_" & key !== '$') {
              tmpTrackJSON[key.toLowerCase()] = trackObj[key][0];
            } else if (key === "$") {
              tmpTrackJSON["type"] = trackObj['$'].type;
            }
          }
          // for General put details outside
          if (tmpTrackJSON.type !== "General") {
            trackList.push(tmpTrackJSON);
          } else {
            tmpTrack = tmpTrackJSON;
          }
        });

        trackJSON["tracks"] = trackList;

        for (var key in tmpTrack) {
          // don't want type for General details
          if (key !== 'type') {
            trackJSON[key] = tmpTrack[key];
          }
        }
        console.log(trackJSON);
        tracks.push(trackJSON);
      });
      deferred.resolve(tracks);
    });
  });
  return deferred.promise;
}