var express = require('express');
var app = express();

app.use('/static', express.static("public"));
app.set("view engine", "ejs");

app.get('/hello', function(req, res){
    res.send('Hello World');
})

app.get('/hello', function(req, res){
    res.render('task.ejs');
})

app.listen(3000, function(){
    console.log('App listening on port 3000')
})