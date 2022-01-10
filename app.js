const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const date = require(__dirname + "/date.js");


const app = express();

const items = ["Code everyday", "Exercise before shower", "Give thanks"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get('/', (req, res) => {

  const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post('/', (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log("Server is running on port 3000!");
});