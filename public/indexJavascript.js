

function menubtn() {
        dropdownContent.classList.toggle("show");
}
function bar(x){
        x.classList.toggle("cross");
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

