function createRoom(event) {
    event.preventDefault();
    // console.log("create room called")
    // Get the room name input value
    const roomNameInput = document.getElementById('room-name-input');
    const roomName = roomNameInput.value;
  
    // Create a data object to send in the request body
    const data = { roomName };
  
    // Send an HTTP POST request to the server
    fetch('/api/rooms/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        // Handle the response from the server
        console.log(result); // Log the response for debugging
        if (result.status) {
          console.log('Room created successfully');
          fetchRoomList();
        } else {
          console.error('Failed to create room:', result.msg);
        }
      })
      .catch(error => {
        console.error('Error creating room:', error);
      });
  
    // Clear the input value
    roomNameInput.value = '';
    
}

// Add an event listener to the form submit event
const createRoomForm = document.getElementById('create-room-form');
createRoomForm.addEventListener('submit', createRoom);

function fetchRoomList() {
    // Send an HTTP GET request to fetch the room list
    fetch('/api/rooms/all')
      .then(response => response.json())
      .then(data => {
        const roomList = document.getElementById('room-list');
  
        // Clear the existing list
        roomList.innerHTML = '';

        data.rooms.forEach(room => {
            const listItem = document.createElement('li');
            listItem.textContent = room.name; 
            roomList.appendChild(listItem);
          });
      })
      .catch(error => {
        console.error('Error fetching room list:', error);
      });
  }


fetchRoomList();