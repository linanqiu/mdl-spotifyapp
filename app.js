var express = require("express"),
  app = express(),
  port = parseInt(process.env.PORT) || 5000;

app.get("/", function(req, res) {
  res.redirect("/index.html");
});

app.use(express.static(__dirname + '/public'));

app.get('/api/spotify', function(req, res) {

  var artist = req.query['artist'];
  var metadata = (req.query['metadata'] === 'true');
  var wrapper = (req.query['wrapper'] === 'true');

  if (artist) {
    if (metadata) {
      var SpotifyMetadataWorker = require('spotify-metadata');
      var spotify = new SpotifyMetadataWorker(false);

      spotify.getLatestAlbum(artist, function(err, result) {
        if (err) {
          console.error(err);
          res.status(400).send("Metadata Worker Error");
        } else {
          console.log("Metadata Worker Used");
          res.status(200).json(result);
        }
      });
    } else {
      var SpotifyWebWorker = require('spotify-web-worker');
      var spotify;

      if (wrapper) {
        console.log("Web Worker With Wrapper");
        spotify = new SpotifyWebWorker(false);
      } else {
        console.log("Web Worker Without Wrapper");
        spotify = new SpotifyWebWorker(true);
      }

      spotify.getLatestAlbum(artist, function(err, result) {
        if (err) {
          console.error(err);
          res.status(400).send("Web Worker Error");
        } else {
          console.log("Web Worker Used");
          res.status(200).json(result);
        }
      });
    }
  } else {
    res.status(400).send("Bad Request");
  }
});

console.log("Server listening at port " + port);

app.listen(port);