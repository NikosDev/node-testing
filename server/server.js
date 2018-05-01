const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    //console.log(req.body);
    
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.send(e);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App started on port 3000!')
});