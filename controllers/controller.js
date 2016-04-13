var User = require('../models/users.js')

function newUser(profile){
	var person = new User ({
		name : profile.displayName, 
		company : profile.company, 
		blog: profile.blog, 
		location: profile.location, 
		email: profile.email, 
		avatar: profile._json.avatar_url, 
		github: profile.profileUrl,
		login: profile.username
	})
	person.save(function(err, user){
		if(err){
			console.log('save error', err)	
		}
		else{
			console.log('user saved', user)
		}
	})
	return person
}
function updateUser(req, res){
	console.log('controller log')
	User.findByIdAndUpdate({_id:req.body._id}, req.body, function(err, user){
		if(err){
			console.log('update error', err)
		}
		else{
			console.log('user updated', user)
			res.json(user)
		}
	})
}function getUpdate(req, res){
	User.findOne({_id:req.body._id}, function(err, user){
		if(err){
			console.log('couldnt find user')
		}
		else{
			console.log('found user', user)
			res.json(user)
		}
	})
}
function getCard(req, res){
	console.log('req params', req.params.login)
	User.findOne({login:req.params.login}, function(err, user){
		if(err){
			console.log('get card error', err)
		}
		else{
			console.log('got card for ', user)
			res.json(user)
		}
	})
}
module.exports = {
	newUser: newUser, 
	updateUser: updateUser,
	getUpdate: getUpdate,
	getCard: getCard,
}