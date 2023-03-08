// create server express to serve data.json
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// allow CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        delete data[req.query.id];
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

// add expense { name, amout, date} in data.json expenses object using fs.writeFileSync
app.post('/addExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        // get expense object from request body
        const expense = req.body;
        // get last id from data.json
        const lastId = Object.keys(data).length;
        // add new expense to data.json
        data[lastId + 1] = expense;
        console.log(data);
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.end(JSON.stringify(data));
    });
})

app.put('/updateExpense', function (req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data[req.query.id] = req.query.expense;
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
