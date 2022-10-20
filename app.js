var express = require('express');
var mongoose = require('mongoose')
var axios = require('axios');
var app = express();



app.use('/static', express.static("public"));
app.set("view engine", "ejs");
const Task = require('./models/task.model');
const mongoDB = 'mongodb+srv://pace_nyeisha:xLWJoDSZ2aIoFQIT@cluster0.mgzqjil.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "))



app.get('/', function(req, res){

    let comic = {}
    randomComic = Math.floor(Math.random()*2682)+1
    String(randomComic)
    console.log(randomComic)
    axios.get('https://xkcd.com/'+ randomComic + '/info.0.json').then(function(response){
        Task.find(function(err, task){
            console.log(task)
            if(err){
                res.json({"Error: ": err})
            } else {
                res.render('task.ejs', {comicData: response.data});
            }
        })
    }).catch(function(error){
        res.json({"Error: ": error})
    })


})

// Creates item in DB

app.post('/create', (req, res) => {
    let newTask = new Task({
        task: req.body.content,
        done: false
    })
    newTask.save(function(err){
        if(err){
            res.json({"Error: ": err})
        } else {
            res.redirect('/');
            
        }
    })
})

// Modifies item in DB
app.put('/done', (req, res) => {
    let id = req.body.id;
    let err = null
    if(typeof id === "string"){
        Task.updateOne({_id: id}, {done: true}, function(error){
            if(error){
                console.log(error)
                err = error
            }

        })

    } else if (typeof id === "object") {
        id.forEach( () => {
            Task.updateOne({_id: id}, {done: true}, function(error){
                if(error){
                    console.log(error)
                    err = error
                }
            })
        })

    }
    if(err){
        res.json({"Error: ": err})
    } else {
        res.redirect('/');
    }
})

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    let err;
    if(typeof id === "string"){
        Task.deleteOne({_id: id}, function(error){
            if(error){
                err = error
            }

        })

    } else if (typeof id === "object") {
        id.forEach( ID => {
            Task.deleteOne({_id: ID}, function(error){
                if(error){
                    err = error
                }
            })
        })

    }
    if(err){
        res.json({"Error: ": err})
    } else {
        res.redirect('/');
    }
})




app.listen(3000, function(){
    console.log('App listening on port 3000')
})