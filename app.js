const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3]




app.get('/', (req, res) => {

  Item.find({}, function(err, foundItems){
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default item to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today",newListItems: foundItems});
    }
  })
});


app.post('/', (req, res) => {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  })
  item.save();
  res.redirect("/")
});

app.post("/delete", (req, res) => {
  checkedItemId = (req.body.checkbox);
  Item.findByIdAndRemove(checkedItemId, function(err){
    if (!err) {
      console.log("Successfully deleted checked item");
      res.redirect("/");
    }
  })
})

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log("Server is running on port 3000!");
});