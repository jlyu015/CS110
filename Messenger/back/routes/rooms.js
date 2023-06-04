const express = require('express');
const router = express.Router()
// TODO: add rest of the necassary imports
const User = require('../model/user');
const Room = require('../model/room');

module.exports = router;

// temporary rooms
rooms = ["room1", "room2", "room3"]

//Get all the rooms
router.get('/all', async (req, res) => {
    try {
        const { username } = req.session;
    
        // Find the user by username
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.json({ msg: "User not found", status: false });
        }
    
        // Retrieve the user's rooms from the database
        const rooms = user.rooms;
        console.log("rooms:", rooms)
        res.json({ rooms });
      } catch (error) {
        console.error("Error fetching user's rooms", error);
        res.status(500).json({ msg: 'Error fetching user\'s rooms', status: false });
      }
});


router.post('/create', async (req, res) => {
    const { roomName } = req.body;
    const { username } = req.session;
    console.log("user:", username, "is trying to create", roomName);

    try {
        const user = await User.findOne({ username });

        if (!user) {
        return res.json({ msg: "User not found", status: false });
        }

        const newRoom = new Room({ name: roomName });
        await newRoom.save();

        user.rooms.push(newRoom);
        await user.save();

        console.log("Room created and added to user's rooms");
        res.json({ msg: "Room created", status: true });
    } catch (error) {
        console.error("Error creating room", error);
        res.status(500).json({ msg: 'Error creating room', status: false });
    }
});

router.post('/join', (req, res) => {
    // TODO: write necassary codes to join a new room
});

router.delete('/leave', (req, res) => {
    // TODO: write necassary codes to delete a room
});

