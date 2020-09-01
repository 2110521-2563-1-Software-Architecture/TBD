const express = require('express');
const app = express();

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
    books.push(req.body)
    console.log(req.body)
    res.send('New book is added')
});

app.delete('/books/:id', (req,res) => {
    const i = books.findIndex(book => book.id === req.params.id)
    books.slice(i,1)
    res.send('Delete book')
})

app.listen(3000, ()=>{
    console.log('Connect to port 3000.')
});