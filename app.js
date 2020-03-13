const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//////////////////////////// Home Page ////////////////////////////

app.route("/")

.get(function(req, res) {
  res.render("home")
});






app.listen(3000, function() {
  console.log("Server running on port 3000...");
});
