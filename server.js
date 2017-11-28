// server.js

/* ========================================
 * ================ SETUP =================
 * ======================================== */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
const port = process.env.PORT || 8080;

// Create express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API file 
const api = require('./app/routes/participant.routes');

// Participant routes
api(app);

// Set locations of Angular static files
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Configure database
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', () => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



