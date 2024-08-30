// server.js

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/userdata', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the user schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create a model for the user schema
const User = mongoose.model('User', userSchema);

// Define a route for signing up
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validate the user input
    if (!username || !email || !password) {
        return res.status(400).send({ message: 'Please fill in all fields' });
    }

    // Hash the password using bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user document
    const user = new User({ username, email, password: hashedPassword });

    // Save the user document to the database
    user.save((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error creating user' });
        }

        // Redirect to the login page
        res.redirect('/login');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});