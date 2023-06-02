const express = require('express');
const User = require('../model/user');
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

router.get('/signup', (req, res) => {
  res.send(`
    <h2>Signup</h2>
    <form action="/api/auth/signup" method="post">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password"><br>
      <label for="displayName">Display Name:</label><br>
      <input type="text" id="displayName" name="displayName"><br>
      <input type="submit" value="Submit">
    </form>
  `);
});
router.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/api/auth/login" method="post">
      <label for="username">Username:</label><br>
      <input type="text" id="username" name="username"><br>
      <label for="password">Password:</label><br>
      <input type="password" id="password" name="password"><br>
      <input type="submit" value="Submit">
    </form>
  `);
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
      res.json({ msg: "Logged in", status: true });
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

