// Introducing the Node Modules
var express = require('express');
var path = require('path');

var app = express();

require('./routes/spotifyRoutes')(app);

app.use(express.static(__dirname + '/public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  res.render('index');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('It lives on port ' + PORT + '!');
