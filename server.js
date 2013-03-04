var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    mongoclient,
    app;

mongoclient = new MongoClient(new Server('localhost', 27017, {native_parser : true}));

app = express();
app.get('/', function (req, res) {
  var body = 'Music groups. The Isley Brothers';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});
app.listen(8080);
console.log('The chickenscratch server is listening on port 8080.');

mongoclient.open(function (err, mongoclient) {
  var db = mongoclient.db('musicgroups'),
      new_group;

  new_group = { 
                "name" : "Broken Bells",
                "beats" : "Danger Mouse",
                "vocals" : "James Mercer"
              }

  db.collection('musicgroups').insert(new_group, function (err, result) {
    console.log(result);
  });
  mongoclient.close();
});
