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

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);
    const navbar = `
    <nav>
        <ul>
            <li><a href="/book-list.html">Book List</a></li>
            <li><a href="/new-book.html">New Book</a></li>
        </ul>
    </nav>
    `;
    res.send(navbar);
});

app.post('/book/:isbn', (req, res) => {
    //reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
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

app.get('/book/:isbn', (req,res) =>{
    const isbn = req.params.isbn;
    let book = null;

    for(let i = 0; i < books.length; i++){
        if(books[i].isbn === isbn){
            book = books[i];
            break;
        }
    }

    if(book){
        res.json(book);
    } 
    else{
        res.send('Book not found');
    }
});

app.delete('/book/:isbn', (req, res) =>{
    const isbn = req.params.isbn;
    let book = null;

    for(let i = 0; i < books.length; i++){
        if(books[i].isbn === isbn){
            book = books[i];
            books.splice(i, 1);
            break;
        }
    }

    if(book){
        res.json(book);
    } 
    else{
        res.send('Book not found');
    }
});

app.get('/new-book.html', (req, res) => {
    res.sendFile(__dirname + '/new-book.html');
});

app.get('/book-list.html', (req, res) => {
    res.sendFile(__dirname + '/book-list.html');
});

app.listen(port, () => console.log('Hello world app listening on port '));
