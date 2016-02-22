var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var path = require("path")

app.use(bodyParser.json());


var fileName = "statuses.json"
var statuses = {}
app.use(express.static(__dirname + '/../app'));

app.post('/statusBoard', function (req, res) {
  res.send('POST request: ' + JSON.stringify(req.body));
  console.log("Received Json: " + JSON.stringify(req.body));
  var name = req.body.fullDisplayName.split("#")[0].trim();

  var shamer = "";
  for(var i=0; i< req.body.actions.length; i++){
    var action = req.body.actions[i];
    if (typeof action.causes != "undefined") {
      shamer += action.causes[0]['userName'];
    }
  }

  var status = { name: name,
                 status: req.body.result,
                 shamer: shamer}

  console.log("New Status: " + status.name + " " + JSON.stringify(status));
  for (var i=0; i< statuses.length; i++) {
    if (statuses[i].name == status.name) {
      statuses.splice(i,1);
    }
  }
  statuses.push(status);
  console.log("Statuses: " + statuses);
  fs.writeFile(fileName, JSON.stringify(statuses), function(err) {
    if (err) return console.log(err);
  });

  console.log("Statuses " + JSON.stringify(statuses));
});

app.get('/Statuses', function (req, res) {
  console.log("Get statuses request: " + JSON.stringify(req.body));
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(statuses);
});

app.get('/', function(req, res) {
  var filePath = path.join(__dirname + '/../app/index.html');
  res.sendFile(filePath)
});

app.listen(3000, function () {
  console.log("Loading old statuses");
  statuses = {}
  statuses = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  console.log("Loaded statuses: " + JSON.stringify(statuses));
  console.log('Status Board listening on port 3000!');
});

//12.106.136.114
