const request = require('request')


function watchBook(){
    
}

function getBook(){
    
}

function listBook(){
    const options = {
        url: 'http://localhost:3000/books',
        method: 'GET',
        secure:false
    };
    request(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(JSON.parse(body));
    });
}

function insertBook(){
    
}

function deleteBook(){
    
}

var processName = process.argv.shift();
var scriptName = process.argv.shift();
var command = process.argv.shift();

if (command == 'list')
  listBook();
else if (command == 'insert')
  insertBook(process.argv[0], process.argv[1], process.argv[2]);
else if (command == 'get')
  getBook(process.argv[0]);
else if (command == 'delete')
  deleteBook(process.argv[0]);
else if (command == 'watch')
  watchBook();