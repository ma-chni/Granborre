const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
const server = require('http').Server(app);
const https = require('https')
const querystring = require('querystring')
const port = 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const username = 'u0ade4dce8345535c6f6f310a353a342f'
const password = '26E2DA80D8BFBC928970F4329CD186CA'
const key = Buffer.from(username + ':' + password).toString("base64");
const options = {
hostname: 'api.46elks.com',
path: '/a1/SMS',
method: 'POST',
headers: {
'Authorization': 'Basic ' + key
}
}

server.listen(port, (err) => {
if (err) {
throw err;
}
console.log('Server running on port ' + port);
});

function sendSMS(recipient, long, lat, options) {
var postFields = {
from: "noreply",
to: recipient,
message: "Bugs detected at " + "longitude: " + long + " and " + "latitude: " + lat,
//okMessage: "Your forest is under control and you don't have to worry :)"
}
var postData = querystring.stringify(postFields)
const callback = (response) => {
var str = ''
response.on('data', (chunk) => {
str += chunk
})

response.on('end', () => {
console.log(str)
})
}

var request = https.request(options, callback)
request.write(postData)
request.end()
}

app.post('/forest-detect', (req, res) => {
console.log(req.body);
sendSMS(req.body.recipient, req.body.lat, req.body.long, options)
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
});

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/forest.html'));
});
