var express = require('express');
var app = express();

app.use('/static', express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");


app.get('/', function(req, res){
    Task.find(function(err, task){
        console.log(task)
        if(err){
            res.json({"Error: ": err})
        } else {
            res.render('task.ejs', {taskList: task}); 
        }
    })
    
})


app.listen(3000, function(){
    console.log('App listening on port 3000')
})