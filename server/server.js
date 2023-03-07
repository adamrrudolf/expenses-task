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

// add expense to data.json using fs.writeFileSync
app.post('/addExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expense"] = data["expense"] + 1;
        console.log(data);
        fs.writeFileSync(__dirname + "/" + "data.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

app.delete('/deleteExpense:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["expense"][req.params.id];
        console.log(data);
        fs.writeFileSync(__dirname + "/" + "data.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

app.put('/updateExpense:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expense"][req.params.id] = req.body;
        console.log(data);
        fs.writeFileSync(__dirname + "/" + "data.json", JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
