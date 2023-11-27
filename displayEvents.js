window.onload = async function () {
    try {
        const response = await fetch('http://127.0.0.1:3000/api/events');
        const events = await response.json();
        // Display the events
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
    function displayEvents(eventsArray) {
    const eventListElement = document.getElementById('event-list');

    // Check if eventListElement is defined before proceeding
    if (!eventListElement) {
        console.error('Error: eventListElement is not defined');
        return;
    }

    // Clear existing event list
    eventListElement.innerHTML = '';

    // Iterate through eventsArray and create HTML elements for each event
    eventsArray.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.classList.add('event-item');
        eventItem.innerHTML = `
            <h1>${event.name}</h1>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Location: ${event.location}</p>
            <p>Description: ${event.description}</p>
            <button id="rsvp-btn" href="${event.link}">RSVP</button>
        `;

        eventListElement.appendChild(eventItem);
    });
}
};