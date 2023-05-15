const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

//Where we will keep books
let books = [];

app.use(cors());

//Configuring body parser middlemare
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item form the books array
    for(let i = 0; i < books.length; i++){
        let book = books[i]

        if(book.isbn === isbn){
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});

app.get('/books', (req, res) =>{
    res.json(books);
});

app.listen(port, () => console.log('Hello world appl listening on port '));
