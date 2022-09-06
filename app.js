const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const { url } = require('inspector');
const { Console } = require('console');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    console.log(req.body);
    const data = {members: [{email_address: req.body.email, status: "subscribed", vip: true, merge_fields: {FNAME: req.body.fname, LNAME: req.body.lname}}]};
    const JSONData = JSON.stringify(data);
    const url = `https://us8.api.mailchimp.com/3.0/lists/0ce17a16f1`
    const options = {
        method: "POST",
        auth: "key:9bde83702148be24a5283d53584e7e2b-us80"
    };
    var request = https.request(url, options, (response) => {
        if (response.status === 200) {
            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + '/failure.html');
        }
        response.on('data', (data) => {
            let resData = JSON.parse(data);
            console.log(resData);
        });
    });
    request.write(JSONData);
    request.end();
});

app.post('/failure', (req, res) => {
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('Server Listening on Port 3000');
});

//API Key: 9bde83702148be24a5283d53584e7e2b-us8
// List ID: 0ce17a16f1