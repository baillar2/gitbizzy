//requirements\\
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var controller = require('./controllers/controller.js')
var logger = require('morgan')
var express = require('express')
var Key = require('./models/key.js')
var request = require('request')
var ClientId = Key.ClientId
var ClientSecret = Key.ClientSecret
var session = require('express-session')
var passport = require('passport')
//create express app\\
var app = express()
mongoose.connect('mongodb://localhost/gitbizzyDB')

//app config\\
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

//passport config\\
var githubStrategy = require('passport-github2').Strategy 
var User = require('./models/users.js')
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
passport.use(new githubStrategy({
	clientID : ClientId, 
	clientSecret : ClientSecret, 
	callbackURL : '/auth/github/callback' 
	},
	function(accessToken, refreshToken, profile, done){
		User.findOne({ github : profile.id }, function (err, user) {
			

			if(err){
				return done(err)
			}	
			// Create new user
			if (!user && profile){
				console.log('profile', profile._json)
				return done (null, controller.newUser(profile))
			}
			// User exists in DB, use them
			if(user){ 
				return done(null, user);  
			}
    	});
		
		
	}))
//routes\\
app.get('/', function(req, res){
	res.sendFile('/index.html', {root:'./public'})
})
app.get('/auth/github',
	passport.authenticate('github', {scope: ['user:email']}))

app.get('/auth/github/callback', 
	passport.authenticate('github', {failureRedirect: '/'}),
	function(req, res){
		res.redirect('/#/bizcard')
	})
app.get('/getUser',
	passport.authenticate('github', {failureRedirect: '/'}),
	)
app.get('/logout', function(req, res){
	req.logout(),
	res.redirect('/')
})
// app.post('/api/newuser', function(req, res){
// 	controller.newUser(req, res)
// })
app.post('/api/update', function(req, res){
	console.log('update fired')
	controller.updateUser(req, res)
})
app.post('/api/getUpdate', function(req, res){
	controller.getUpdate(req, res)
})

app.get('/:login', function(req, res){
	res.sendFile('/bizcard.html', {root:'./public'})
})
app.get('/api/getcard/:login', function(req, res){
	controller.getCard(req, res)
})

//listen\\
var port = 3000
app.listen(port, function(){
	console.log('server running on port ' + port)
})