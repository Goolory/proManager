
var express = require('express')
var app = new express();


var session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*30
    },
    rolling:true
}))

var admin = require('./routes/admin.js')
var index = require('./routes/index.js')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/upload', express.static('upload'))

app.use('/admin', admin)
app.use('/', index)


app.listen(5000, '127.0.0.1');