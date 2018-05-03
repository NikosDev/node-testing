const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

/*   POST Todos    */
app.post('/todos', (req,res) => { 
    /* console.log({
        text: req.body.text,
        completed: req.body.completed
    })  */
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

/*   GET Todos    */
app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.send(e);
    });
});

/*   GET Todos ID    */
app.get('/todos/:id', (req,res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo){
            return res.status(404).send();
        }
        
        res.send({todo});
    }).catch((e) => {
        res.status(404).send();
    })
});

/*   POST Users   */
app.post('/users', (req,res) => {
    var body = {
        email: req.body.email,
        password: req.body.password
    };
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.send(e);
    })
});

/*   Get My User(login)   */
app.get('/users/me', authenticate, (req,res) => {
    res.send(req.user);
});


app.listen(process.env.PORT || 3000, () => {
    console.log('App started on port 3000!')
});