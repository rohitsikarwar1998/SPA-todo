var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  expressSanitizer = require("express-sanitizer");
// methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/my_database', {
  useMongoClient: true,
});
// app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
// app.set("view engine", "ejs");
// app.use(methodOverride('_method'));

var todoSchema = new mongoose.Schema({
  text: String,
});

var Todo = mongoose.model("Todo", todoSchema);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


app.get("/todos", function (req, res) {
  Todo.find({}, function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  })
});



app.post("/todos", function (req, res) {
  // console.log(count++);
  req.body.todo.text = req.sanitize(req.body.todo.text);
  // console.log(req.body.todo.text);
  var formData = req.body.todo;
  Todo.create(formData, function (err, newTodo) {
    if (err) {
      console.log(err);
    } else {
      // console.log(req.xhr);
      res.json(newTodo);
    }
  });
});


app.put("/todos/:id", function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo, { new: true }, function (err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

app.delete("/todos/:id", function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) {
      console.log(err);
    } else {
      todo.remove();
      res.json(todo);
    }
  });
});


app.listen(3000, function () {
  console.log('Server running on port 3000');
});

// // Uncomment the three lines of code below and comment out or remove lines 84 - 86 if using cloud9
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The server has started!");
// });
