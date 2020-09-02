const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app); 
const events = require('events');
const bodyParser = require('body-parser')

const bookStream = new events.EventEmitter();
let books = [{id:1, title:'team', author:'team'}];

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/books', (req,res) => {
    res.send(books)
})

app.get('/books/:id', (req,res) => {
    for (let book of books) {
        if (book.id === parseInt(req.params.id)) {
            res.json(book);
            return;
        }
    }
    res.send('Book not found')
});

app.post('/books', (req,res) => {
    book = req.body
    books.push(book)
    bookStream.emit('new_book',book)
    console.log(book)
    res.send('New book is added')
});

app.delete('/books/:id', (req,res) => {
    const deletedIndex = books.findIndex(book => book.id === req.params.id)
   books.splice(deletedIndex, 1)
   res.status(204).send()
})

app.get('/streaming', (req,res) => {
    bookStream.on('new_book',function(book){
        res.write(book)
    })
})

server.listen(3000, ()=>{
    console.log('Connect to port 3000.')
});