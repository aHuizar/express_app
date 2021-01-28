const express = require("express");
const path = require("path");

const app = express();

const Database = require("better-sqlite3");
const db = new Database("foobar.db", { verbose: console.log });

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getList", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

app.get("/api/cats/:name", (req, res) => {
  const stmt = db.prepare("SELECT * FROM cats WHERE name = ?");
  const cat = stmt.get(req.params.name);
  res.json(cat);
  console.log(cat);
});

const createTable =
  "CREATE TABLE IF NOT EXISTS cats ('name' varchar, 'age' int, CONSTRAINT name_age UNIQUE (name,age));";

db.exec(createTable);

const insert = db.prepare("INSERT INTO cats (name, age) VALUES (@name, @age)");

const insertMany = db.transaction((cats) => {
  for (const cat of cats) insert.run(cat);
});

try {
  insertMany([
    { name: "Joey", age: 2 },
    { name: "Sally", age: 4 },
    { name: "Junior", age: 1 },
  ]);
} catch (e) {
  if (!e.message.includes("UNIQUE constraint failed: cats.name, cats.age"))
    console.error(e.name + ": " + e.message);
}

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log("App is listening on port " + port);
