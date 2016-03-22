//requirements\\
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var controller = require('controller')
var logger = require('morgan')
var express = require('express')
var key = require('./models/key.js')
//create express app\\
var app = express()
mongoose.connect('mongodb://localhost/gitbizzyDB')

//app config\\
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extened: true}))
app.use(express.static(__dirname + '/public'))


//passport config\\
var passport = require('passport')
var githubStrategy = require('passport-github2').Strategy 
var User = require('./models/user.js')
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done){
	done(null, user.id)
})
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user)
	})
})

//routes\\

app.get('/', function(req, res){
	res.sendFile('/index.html', {root:'./public'})
})




//listen\\
var port = 3000
app.listen(port, function(){
	console.log('server running on port ' + port)
})