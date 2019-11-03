var mysql = require('mysql')
var express = require('express')
var app = express()
var path = require('path')

app.listen(8080, function(err){
    if (err) throw err;
});

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "goodgame",
    database : "college_mag"
})

app.set('views',  path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use( express.static( "assets" ) );

app.get('/',function(req, res){
    res.render('home')
    res.end()
})

app.get('/home',function(req, res){
    res.render('home')
})

// app.get('/student_login',function(req, res){
    
//     res.sendFile()
// })

// app.post('/student_check', function(req, res){
//     sql = ``
//     con.query(sql, function(err, result, fields){

//     })
// })



app.get('/admin', function(req, res){
    res.render('admin',{data: 'Admin Login'})
})

// app.post('/student_check', function(req, res){
//     sql = `select pwd from student where username = ${req.body.username}`
//     con.query(sql, function(err, result, fields){


//     })
// })


// app.get('/registration', function(req, res){
//     sql = ``
// })

// app.post('/enter_data', function(req, res){
//     sql = `insert into student values (${req.body.username}, ${req.body.pwd}, ${req.body.contact}, ${req.body.email}, ${req.body.address}, ${req.body.dob});`
//     con.query(sql, function(err){
        
//     })
// })

// app.get('/artical_upload', function(req, res){

// })
