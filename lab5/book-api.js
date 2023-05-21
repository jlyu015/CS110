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
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

app.get('/new-book.html', (req, res) => {
    res.sendFile(__dirname + '/new-book.html');
  });

app.get('/book-list.html', (req, res) => {
    res.sendFile(__dirname + '/book-list.html');
});

app.get('/book-list.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/book-list.js');
  });

app.post('/book', (req, res) => {
    const book = req.body;

    
    books.push(book);
    console.log("book added: ", books);
    res.send(`
        <h1>Book is added to the database</h1>
        <nav>
            <ul>
                <li><a href="/new-book.html">Add New Book</a></li>
                <li><a href="/book-list.html">Book List</a></li>
            </ul>
        </nav>
    `);
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
    res.send(`
        <h1>Book is edited</h1>
        <nav>
            <ul>
                <li><a href="/new-book.html">Add New Book</a></li>
                <li><a href="/book-list.html">Book List</a></li>
            </ul>
        </nav>
    `);
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
    console.log("inside app delete");
    if(book){
        console.log("found book", book);
        res.json(book);
    } 
    else{
        res.send('Book not found');
    }
});

app.use(express.static('public'));
app.listen(port, () => console.log('Hello world app listening on port ', port));
