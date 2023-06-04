const express = require('express');
const User = require('../model/user');
const path = require('path')
const router = express.Router()

module.exports = router;

router.post('/signup', async (req, res) =>{
  
  const { username, password, displayName } = req.body;
  console.log("user is trying to signup",username, password, displayName)



  try {
    const userExists = await User.findOne({username});

    if(userExists) {
      return res.json({ msg: "Username already exists", status: false });
    }

    const newUser = new User({username, password, displayName});

    await newUser.save();

    console.log("added user to database");
    res.json({ msg: "User created", status: true });

  } catch (error) {
    console.error("error on signup insert",error )
    res.status(500).json({ msg: 'Error saving user', status: false });
  }
  // TODO: Store the new user in the database
});

router.post('/login', async (req, res) => {
    const {session} = req;
    const { username, password } = req.body;

    // check if user in database
    const user = await User.findOne({ username });
    
    if (!user)
      return res.json({ msg: "Incorrect Username ", status: false });
    else if (user.password !== password)
      return res.json({ msg: "Incorrect Password", status: false });
    else {
      session.authenticated = true;
      session.username = username;
      // res.json({ msg: "Logged in", status: true });
      // res.sendFile(path.join(__dirname, '..','..', 'front', 'rooms.html'))
      res.redirect('/');
    }
});
router.use((req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
});
// Set up a route for the logout page
router.get('/logout', (req, res) => {
    // Clear the session data and redirect to the home page
    req.session.destroy();
    res.send({msg: "Logged out", status: true})
  });

router.get('/login', (req, res) => {
  if (req.session && req.session.authenticated) {
    // User is already authenticated, redirect to the home page or rooms page
    res.redirect('/'); // Replace with the appropriate URL
  } else {
    // User is not authenticated, show the login/signup page
    res.sendFile(path.join(__dirname, '..', 'front', 'login_signup.html'));
  }
});