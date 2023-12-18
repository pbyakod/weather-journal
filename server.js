// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route
app.get('/all', getInfo);

function getInfo(req, res) {
  res.send(projectData);
};

// POST route
app.post('/add', postInfo);

function postInfo(req, res) {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Initializing server
const port = 8000;
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

