const express = require('express');
const mysql = require('mysql');
var expressLayouts=require('express-ejs-layouts')
const BodyParser = require('body-parser')

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'magazine'
});

var con = db.connect((err)=>{
    if(err){
        console.log("Error Connecting DB")
    }else{
        console.log("DB Connected")
    }
})

const app = express();
app.use(expressLayouts)
app.set('view engine',"ejs")

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render("home")
})



app.listen('3000',() => {
    console.log('server started on port 3000');
});
app.use("/",express.static(__dirname + '/assets/'));