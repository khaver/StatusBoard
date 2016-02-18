var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());


var fileName = "statuses.json"
var statuses = {}

app.post('/statusBoard', function (req, res) {
  res.send('POST request: ' + JSON.stringify(req.body));

  var name = req.body.fullDisplayName.split("#")[0].trim();
  var status = { name: name,
                 status: req.body.result,
                 shamer: req.body.actions[0].causes[0]['userName']}

  statuses[status.name] = status
  fs.writeFile(fileName, JSON.stringify(statuses), function(err) {
    if (err) return console.log(err);
  });

  console.log("Statuses " + JSON.stringify(statuses));
});

app.get('/Statuses', function (req, res) {
  console.log("Get statuses request: " + req.body)
  res.send(JSON.stringify(JSON.stringify(statuses)));
});

app.listen(3000, function () {
  console.log("Loading old statuses");
  statuses = {}
  statuses = JSON.parse(fs.readFileSync(fileName, 'utf8'));
  console.log("Loaded statuses: " + JSON.stringify(statuses));
  console.log('Status Board listening on port 3000!');
});

//12.106.136.114
