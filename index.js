const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
let dbPath = path.join(__dirname, "goodreads.db");
let db = null;

const intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Surver is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
intializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = ` SELECT *
        FROM book ORDER BY book_id;`;
  let booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
