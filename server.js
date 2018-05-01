const express = require('express');

let app = express();

//app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send({
        Name: 'nikos',
        Age: 23,
        Node: true,
        languages: ['php','angular','node','laravel','bootstrap','javascript'] 
    })
});

app.listen(3000);