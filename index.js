const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const morgan = require('morgan');
const cors = require('cors');


// Initiate Mongo Server
InitiateMongoServer();

const app = express();
app.use(morgan('dev'));

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/build'));

app.get("*", (req, res) => {
  response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
