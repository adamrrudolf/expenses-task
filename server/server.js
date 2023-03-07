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

// delete expense in data.json expenses object using fs.writeFileSync
app.delete('/deleteExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["expenses"][req.query.id];
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

// add expense in data.json expenses object using fs.writeFileSync
app.post('/addExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expenses"][req.query.id] = req.query.expense;
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

app.put('/updateExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["expenses"][req.query.id] = req.query.expense;
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

// start server
const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
