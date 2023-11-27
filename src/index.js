const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;

const connect = require('./connection.js');

connect();

const app = express();


app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());

// Define a simple event schema
const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    location: String,
    description: String,
    userId: String,
});

const Event = mongoose.model('Event', eventSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());


// Route to get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Define a user schema
const userSchema = new mongoose.Schema({
    username: String,
    mobile: String,
    email: String,
    password: String,
    token: String,
});


const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    const username = req.body.username;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const password = req.body.password;
    console.log(username);
    const existingUser = await User.findOne({ username });
    try {

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        if (username == '') {
            return res.status(200).json({ error: "pleasee enter the username" });
        }

        const newUser = new User({ username, mobile, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(cookieParser());

const secret_key = 'thisissecrectkeycanyoucrackit';

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
        return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ userId: user._id }, secret_key);
    res.cookie("sessionId", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000000,
    });
    res.cookie("UserId", user.username, {
        httpOnly: false,
        secure: false,
    });
    res.redirect('/createNewEvent');
});


const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.sessionId;
    if (!token) {
        return res.redirect('/auth');
    }
    const decode = jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.sendFile(path.join(__dirname, '..', 'public', 'error.html'));
        }
        req.user = decoded;
        next();
    });
};

// Route to create a new event
app.post('/createEvent', isAuthenticated, async (req, res) => {
    const name = req.body.eventName;
    const date = req.body.eventDate;
    const time = req.body.eventTime;
    const location = req.body.eventLocation;
    const description = req.body.eventDescription;
    try {
        let userId;
        const token = req.headers.authorization || req.cookies.sessionId;
        const decode = jwt.verify(token, secret_key, (err, decoded) => {
            userId = decoded.userId;
        });
        console.log(name);
        const event = await Event.findOne({ userId });
        if (event != null && event.name === name) {

            res.status(200).redirect('/profile');

        }
        const newEvent = new Event({ name, date, time, location, description, userId });
        await newEvent.save();
        res.status(200).redirect('/profile');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});



// const isLoggedin= (req,res,next)=>{
//     const token = req.headers.authorization || req.cookies.sessionId;
//     if (!token) {
//         next();
//     }
//         res.redirect('/profile');
// };

app.get('/profile', isAuthenticated, (req, res) => {
    const name = req.cookies.UserId;
    res.sendFile(path.join(__dirname, '..', 'public', 'profile.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})
app.get('/login', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/createNewEvent', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'createNewevent.html'));
});


app.get('/api/ownEvent', async (req, res) => {
    try {
        let userId;
        const token = req.headers.authorization || req.cookies.sessionId;
        const decode = jwt.verify(token, secret_key, (err, decoded) => {
            userId = decoded.userId;
        });
        const event = await Event.find({ userId });
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/logout', (req, res) => {
    // const token = req.headers.authorization || req.cookies.sessionId;
    res.clearCookie("sessionId");
    res.redirect('/auth');
});

const rsvpSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    eventId: String,
});

const eventTickets = mongoose.model('EventTicket', rsvpSchema);
//ticket register
app.post('/rsvp', async (req, res) => {
    const name = req.body.name;
    const mobile = req.body.mobile;
    const eventId = req.body.eventId;
    try {
        const eventTicket = new eventTickets({ name, mobile, eventId });
        await eventTicket.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ error: "Internal server error" })
    }
});

app.use(express.urlencoded({ extended: true }));

app.post('/viewRequest', async (req, res) => {
    const eventId = req.body.eventId;


    let userId;
    const token = req.headers.authorization || req.cookies.sessionId;
    const decode = jwt.verify(token, secret_key, (err, decoded) => {
        userId = decoded.userId;
    });
    const event = await Event.find({ userId });
    if (userId == event[0].userId) {
        const eventTicket = await eventTickets.find({ eventId });
        res.json(eventTicket);

    }






    // try {
    // const eventTicket = await eventTickets.find({eventId});
    // res.json(eventTicket);
    // } catch (error) {
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

