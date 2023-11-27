// RSVP Functionality
document.getElementById('rsvp-btn').addEventListener('click', function () {
    alert('RSVP Successful!');
});




// <!-- Edit and Delete Buttons -->
// function displayEvents() {
//     const eventList = document.getElementById('event-list');
//     eventList.innerHTML = ''; // Clear existing list

//     events.forEach((event, index) => {
//         const listItem = document.createElement('li');
//         listItem.innerHTML = `<strong>${event.name}</strong> - ${event.date}, ${event.time} - ${event.location}<br>${event.description}
//             <button onclick="editEvent(${index})">Edit</button>
//             <button onclick="deleteEvent(${index})">Delete</button>`;
//         eventList.appendChild(listItem);
//     });
// }

function editEvent(index) {
    // You can implement code to populate the form with existing event details for editing.
    // For simplicity, let's just alert the event index for now.
    alert(`Editing event at index ${index}`);
}

function deleteEvent(index) {
    // You can implement code to remove the event from the events array.
    // For simplicity, let's just alert the event index for now.
    alert(`Deleting event at index ${index}`);
}

// Update the Edit Functionality

    function editEvent(index) {
        const event = events[index];

        // Populate the form with existing event details for editing
        document.getElementById('event-name').value = event.name;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-time').value = event.time;
        document.getElementById('event-location').value = event.location;
        document.getElementById('event-description').value = event.description;

        // Optional: You can also change the 'Create Event' button to 'Update Event'
        // For simplicity, let's just alert the event index for now.
        alert(`Editing event at index ${index}`);
    }

    // Implement Delete Functionality
    // Previous code...

    function deleteEvent(index) {
        // Remove the event from the events array
        events.splice(index, 1);

        // Update the displayed event list
        displayEvents();
    }



    function searchEvents() {
        const searchTerm = document.getElementById('search-event').value.toLowerCase();
        const filteredEvents = events.filter(event => event.name.toLowerCase().includes(searchTerm));
        displayFilteredEvents(filteredEvents);
    }

    function displayFilteredEvents(filteredEvents) {
        const eventList = document.getElementById('event-list');
        eventList.innerHTML = '';

        filteredEvents.forEach((event, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${event.name}</strong> - ${event.date}, ${event.time} - ${event.location}<br>${event.description}
                <button onclick="editEvent(${index})">Edit</button>
                <button onclick="deleteEvent(${index})">Delete</button>`;
            eventList.appendChild(listItem);
        });
    }

