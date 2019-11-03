var mysql = require('mysql')
var express = require('express')
var app = express()
var path = require('path')
var student = "Guest"
var bodyParser = require('body-parser')


app.listen(8080, function (err) {
    if (err) throw err;
    console.log("listening on port" + 8080)
});
app.use(express.urlencoded({ extended: true }));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "goodgame",
    database: "college_mag"
})
con.connect((error) => {
    if (error) {
        console.log(error);
    }
    console.log("connected to database");

})
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static("assets"));
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('home', { name: student })
    res.end()
})
app.get('/home', function (req, res) {
    res.redirect('/')
})


app.get('/admin', function (req, res) {
    res.render('admin', { data: 'Admin Login' })
})

app.post('/admin_check', function (req, res) {
    console.log(req.body);

    // var sql = `select pwd from admin where username = ${req.body.Username}`
    con.query("select pwd from admin where username = ?",[req.body.Username], function(err, result, fields){
        console.log(result.length)
        if (err) throw err;
        if (result.length == 0){
            res.redirect('/admin')
        }
        else{
            student = req.body.Username
            res.redirect('/')
        }

    
    })
})

app.get('/student', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/studen.html'))
})

app.post('/student_check', function (req, res) {
    res.send(`${req.body.hello}`)
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


app.get('/upload', function (req, res) {
    if(student == "Guest"){
        res.redirect('student_login')
    }
    else{
    res.render('upload', { username: student })
    }
})


app.get('/stureg', function (req, res) {
    res.render('studentreg')
})

app.post('/enter_data', function (req, res) {
    sql = `insert into student values (${req.body.username}, ${req.body.pwd}, ${req.body.contact}, ${req.body.email}, ${req.body.address}, ${req.body.dob});`
    con.query(sql, function (err) {
        if (err) {
            throw err;
            res.redirect('/registration')
        }
    })
})


// app.get('/artical_upload', function(req, res){

// })
