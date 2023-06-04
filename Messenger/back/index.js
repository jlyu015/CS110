
const express = require("express");
const socketIO = require('socket.io');
const http = require('http');
const cors  = require("cors");
const session = require('express-session');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const bodyParser = require( 'body-parser');
const auth = require('./routes/auth');
const rooms = require('./routes/rooms');

const app = express(); 
const server = http.createServer(app);



// TODO: add cors to allow cross origin requests
const io = socketIO(server, {
  cors: {
    origin: '*',
  }
});
app.use(cors({origin: 'http://localhost:3000', credentials:true}))


dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Connect to the database
// TODO: your code here
mongoose.connect(process.env.MONGO_URL);
const database = mongoose.connection;


database.on('error', (error) => console.error(error));
database.once('open', () => console.log('Connceted to Database'));

// Set up the session
// TODO: your code here
const sessionMiddleware = session({
  resave: false, // Whether to save the session to the store on every request
  saveUninitialized: false, // Whether to save uninitialized sessions to the store
  secret: process.env.SESSION_SECRET,
}); 


app.use(sessionMiddleware);

app.use(express.static('front', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.type('application/javascript');
    }
  }
}));


app.use("/api/auth/", auth);
app.use("/api/rooms/", rooms);


//handling request to root of website
app.get('/', (req, res) => {
  if (req.session && req.session.authenticated) {
    // res.json({ message: "logged in" });
    res.sendFile(path.join(__dirname, '..', 'front','rooms.html' ))
  }
  else {  
    console.log("not logged in")
    // res.json({ message: "not logged" });
    res.sendFile(path.join(__dirname, '..', 'front', 'login_signup.html'));
  }
});


app.get('/js/rooms.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/js/rooms.js'));
});

//access signup page from route without session
app.get('/signup', (req, res) => {
  res.redirect('/api/auth/signup');
});



// checking the session before accessing the rooms
app.use((req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});







// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});


// TODO: make sure that the user is logged in before connecting to the socket
// TODO: your code here
io.use((socket, next) => {
  console.log("socket io middleware")
  sessionMiddleware(socket.request, {}, next);
});

io.use((socket, next) => {
  if(socket.request.session && socket.request.session.authenticated){
    next();
  }
  else {
    console.log("unauthorized")
    next(new Error('unauthorized'));
  }
});

io.on('connection', (socket)=>{
  console.log("user connected")
  // TODO: write codes for the messaging functionality
  // TODO: your code here
  
})