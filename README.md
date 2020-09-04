# Members
1.  6030053921  Keerati Chuatanapinyo
2.  6030559121  Siwat Pongpanit
3.  6030631621  Anawat Trongwattananon
4.  6031022621  Thanapun Yan-amporn
5.  6031055321  Weerayut Thinchamlong
6.  6031059921  Setthanan Nakaphan

# Screenshots of Swagger for your APIs
![alt text](https://raw.githubusercontent.com/2110521-2563-1-Software-Architecture/TBD-Assignment-1/master/swagger_api_doc.png "Swagger API Documentation")

# Source codes of REST API's server and client
## Server
```javascript
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    info: {
      title: "Book REST API",
      description: "REST API | Software Architecture Assignment 1",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let books = [{ id: 1, title: "team", author: "team" }];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * /books:
 *  get:
 *      summary: Returns list of all books
 *      responses:
 *          '200':
 *              description: A successful response
 */

app.get("/books", (req, res) => {
  res.status(200).send(books);
});

/**
 * @swagger
 * /books/{id}:
 *  get:
 *      summary: Return a book with a specific id
 *      responses:
 *          '200':
 *              description: A successful response
 *  parameters:
 *      -   name: id
 *          in: path
 *          description: An ID of a book to get
 *          required: true
 *          schema:
 *              type: integer
 */
app.get("/books/:id", (req, res) => {
  for (let book of books) {
    if (book.id === parseInt(req.params.id)) {
      res.status(200).json(book);
      //   return;
    }
  }
  res.status(200).send("Not found");
});

/**
 * @swagger
 * /books/insert:
 *  post:
 *      summary: Insert a new book
 *      parameters:
 *        - name: Book
 *          in: body
 *          description: ID of a new book to be inserted
 *          required: true
 *          schema:
 *            type: object
 *            property:
 *              id:
 *                  type: integer
 *              title:
 *                  type: string
 *              author:
 *                  type: string
 *            example:
 *              id: 2
 *              title: The Handmaid's Tale
 *              author: Magaret Atwood
 *
 *      responses:
 *          '201':
 *              description: Successfully inserted a new book.
 *
 */
app.post("/books/insert", (req, res) => {
  book = req.body;
  books.push(book);
  //   bookStream.emit("new_book", book);
  //   console.log(res.status);
  res.status(201).send("");
});

/**
 * @swagger
 * /books/delete/{id}:
 *  delete:
 *      summary: Return a book with a specific id
 *      responses:
 *          '204':
 *              description: Successfully deleted a book
 *  parameters:
 *      -   name: id
 *          in: path
 *          description: An ID of a book to delete
 *          required: true
 *          schema:
 *              type: integer
 */
app.delete("/books/delete/:id", (req, res) => {
  const deletedIndex = books.findIndex(
    (book) => book.id === parseInt(req.params.id)
  );
  console.log(deletedIndex);
  books.splice(deletedIndex, 1);
  res.status(204).send("");
});

server.listen(3000, () => {
  console.log("Connect to port 3000.");
});

```

## Client
```javascript
const request = require("request");

function getBook(bookID) {
  request.get(
    "http://localhost:3000/books/" + String(bookID),
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      console.log(JSON.parse(body));
    }
  );
}

function listBook() {
  const options = {
    url: "http://localhost:3000/books",
    secure: false,
  };
  request.get(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(JSON.parse(body));
  });
}

function insertBook(bookID, bookTitle, bookAuthor) {
  const options = {
    url: "http://localhost:3000/books/insert",
    json: true,
    body: {
      id: parseInt(bookID),
      title: bookTitle,
      author: bookAuthor,
    },
  };
  request.post(options, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
  });
}

function deleteBook(bookID) {
  request.delete(
    "http://localhost:3000/books/delete/" + String(bookID),
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}


var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == "list") listBook();
else if (command == "insert")
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == "get") getBook(process.argv[0]);
else if (command == "delete") deleteBook(process.argv[0]);


```

# Compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a Table format as shown below. 

| Functions | gPRC | REST API | 
| :---: | :---: | :---: |
| List books | node client.js list | 283 | 
| Insert book | node client.js insert 'id' 'title' 'author' | 283 | 
| Get book | node client.js get 'id' | 283 |
| Delete book | node client.js delete 'id' | 283 |
| Watch | node client.js watch | - | 

# What are the main differences between REST API and gRPC?
# What is the benefits of introduceinterface in front of the gRPC and REST API of the book services. 
# Based on the introduced interface, compare how to call the methods based on gRPC and REST API side-by-side, e.g. in a Table format as shown below. 

| Functions | gPRC | REST API | 
| :---: | :---: | :---: |
| List books | node client.js list | 283 | 
| Insert book | node client.js insert 'id' 'title' 'author' | 283 | 
| Get book | node client.js get 'id' | 283 |
| Delete book | node client.js delete 'id' | 283 |
| Watch | node client.js watch | 283 | 

# Component diagram representing the book services with and without interfaces.

