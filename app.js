const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

mongoose.connect('mongodb://localhost/ContactMe', { useNewUrlParser: true, useUnifiedTopology: true });

var contactSchema = new mongoose.Schema({
    fullName: String,
    mobileNumber: String,
    emailAddress: String,
    emailSubject: String,
    Message : String,
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from a directory (e.g., 'public')
app.use(express.static(path.join(__dirname, 'public')));

var ContactMessage = mongoose.model('ContactMessage' , contactSchema);

// Define a route for handling form submissions
app.post('/', (req, res) => {
    var myData = new ContactMessage(req.body);
    myData.save().then(() =>{
        res.redirect('index2.html')
    }).catch(err => {
        console.log(err);
        res.status(404).send("The form was not submitted successfully");
    });
});

// Serve the index.html file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    const serverURL = `http://localhost:${port}`;
    console.log(`Server is running on ${serverURL}`);
});
