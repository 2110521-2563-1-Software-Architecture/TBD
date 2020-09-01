const express = require('express');
const app = express();
const events = require('events');

const bookStream = new events.EventEmitter();
let books = [];


app.get('/books', (req,res) => {
    res.json(books)
})

app.get('/books/:id', (req,res) => {
    if(books.find(book => book.id === req.params.id)){
        res.json(book)
        return
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
    var i = books.findIndex(book => book.id === req.params.id)
    books.splice(i,1)
    res.send('Delete book')
})

app.get('/streaming', (req,res) => {
    bookStream.on('new_book',function(book){
        res.write(book)
    })
})

app.listen(3000, ()=>{
    console.log('Connect to port 3000.')
});