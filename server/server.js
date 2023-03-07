// create server express to serve data.json
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/data', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

// add expense to data.json
app.post('/addExpense', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expenses"].push(req.body);
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

// delete expense from data.json
app.delete('/deleteExpense/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["expenses"][req.params.id];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

// update expense from data.json
app.put('/updateExpense/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expenses"][req.params.id] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

// start server
const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
