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
var t1 = ""
var t2,a1,a2,txt1,txt2



app.get('/', function (req, res) {
    con.query('select * from article where art_no order by art_no desc limit 2;',function(err, result, fields){
        
        const obj = JSON.parse(JSON.stringify(result))
        t1 = obj[0].title
        a1 = obj[0].stu_username
        txt1= obj[0].content
        t2 = obj[1].title
        a2 = obj[1].stu_username
        txt2= obj[1].content
    })    
    
   
    // console.log(t1)
    res.render('home_1', {title1:t1, author1 : a1, title2: t2, author2 : a2})
    res.render('home_1', {title1:t1, author1 : a1, title2: t2, author2 : a2})
    res.end()
})

app.get('/logout', function (req, res){
    student = "Guest"
    res.redirect('/')
})

app.get('/home', function (req, res) {
    res.redirect('/')
})




app.get('/admin',function (req, res){
    con.query('select * from article where art_no order by art_no desc limit 2;',function(err, result, fields){
        
        const obj = JSON.parse(JSON.stringify(result))
        t1 = obj[0].title
        a1 = obj[0].stu_username
        t2 = obj[1].title
        a2 = obj[1].stu_username
        
    })
    res.render('admin', {title1:t1, author1 : a1, title2: t2, author2 : a2})
    if (err) throw err;
})

app.get('/templet.html', function (req, res) {
    // console.log(typeof(txt2))
    res.render('templet', { title:t1, author: a1, data: txt1})
})

app.get('/temp',function (req, res){
    res.render('templet', { title:t2, author: a2, data: txt2})
})



app.post('/admin_check', function (req, res) {

    con.query("select pwd from admin where username = ?",[req.body.uname], function(err, result, fields){
        // console.log(result.length)
        if(result.length != 0){
            if (result[0].pwd == req.body.pwd){
                student = req.body.uname
                console.log("logged in")
                res.redirect('/admin')
            }
            else{
                res.redirect('/')
            }
        }
        else{
            res.redirect('/')
        }
    
    })
})

app.get('/student', function (req, res) {
    con.query('select * from article where art_no order by art_no desc limit 2;',function(err, result, fields){
        
        const obj = JSON.parse(JSON.stringify(result))
        t1 = obj[0].title
        a1 = obj[0].stu_username
        t2 = obj[1].title
        a2 = obj[1].stu_username
    })
    res.render('student', {title1:t1, author1 : a1, title2: t2, author2 : a2})
})

app.post('/student_check', function (req, res) {
    // sql = `select pwd from student where username = ${req.body.username};`
    con.query('select pwd from student where username = ?;', [req.body.uname], function(err, result, fields){
        if(result.length != 0){
            if (result[0].pwd == req.body.pwd){
                student = req.body.uname
                console.log("logged in")
                res.redirect('/student')
            }
            else{
                res.redirect('/')
            }
        }
        else{
            res.redirect('/')
        }
        
    })
})


app.get('/upload', function (req, res) {
    if(student == "Guest"){
        res.redirect('/')
    }
    else{
    res.render('upload', { name: student })
    }
})
app.post('/data', function(req, res){

    con.query("insert into article values (0, ?, 'TBC',?,?,?);",[student,req.body.text,null,req.body.title] , function (err) {
        if (err) throw err;
    })
    res.redirect('/student')
})


app.post('/reg', function (req, res) {
    console.log(req.body);
    
    const {username,pwd,contact} = req.body
    
    con.query('insert into student values (?, ?, ?);',[username,pwd,contact] , function (err) {
        if (err) {
            throw err;
            res.redirect('/')
        }
        else{
            student=req.body.username
            res.redirect('/')
        }
    })
})