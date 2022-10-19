var express = require('express');
var app = express();
const axios = require('axios');

app.use('/static', express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");



axios.get('https://xkcd.com/614/info.0.json/')
    .then(function(response) {
        console.log(response.data);
    })

app.post('/create', (req, res) => {
    let newTodo = new Todo({
        todo: req.body.content,
        done: false
    })
    newTodo.save(function(err, todo){
        if(err){
            res.json({"Error: ": err})
        } else {
            res.redirect('/');
        }
    })
})


app.listen(3000, function(){
    console.log('App listening on port 3000')
})