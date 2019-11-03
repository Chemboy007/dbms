var mysql = require('mysql')
var express = require('express')
var app = express()
var path = require('path')
var student = "Guest"

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
    res.render('home', {name : student})
    res.end()
})
app.get('/home',function(req, res){
    res.redirect('/')
})


app.get('/admin', function(req, res){
    res.render('admin',{data: 'Admin Login'})
})

app.post('/admin_check',function(req, res){
    var sql = `select pwd from admin where username = ${req.body.username};`
    con.query(sql, function(err, result, fields){
        // if (result.pwd == result.username){
        //     res.redirect('/admin')
        // }
        if (result.pwd == req.body.pwd){
            student = req.body.username
            res.redirect('/')
        }
        else{
            res.redirect('/admin')
        }
    })
})

app.get('/student',function(req, res){
    res.render('student')
})

app.post('/student_check', function(req, res){
    sql = `select pwd from student where username = ${req.body.username};`
    con.query(sql, function(err, result, fields){
        if (result.pwd == req.body.pwd){
            student = req.body.username
            res.redirect('/')
        }
        else{
            res.redirect('/student_login')
        }
    })
})


app.get('/upload',function(req, res){
    if(student == "Guest"){
        res.redirect('student_login')
    }
    else{
        res.render('upload',{username : student})
    }
})


app.get('/registration', function(req, res){
    res.render('registration')

})

app.post('/enter_data', function(req, res){
    sql = `insert into student values (${req.body.username}, ${req.body.pwd}, ${req.body.contact}, ${req.body.email}, ${req.body.address}, ${req.body.dob});`
    con.query(sql, function(err){
        if(err){
            throw err;
            res.redirect('/registration')
        } 

    })
})







// app.get('/artical_upload', function(req, res){

// })
