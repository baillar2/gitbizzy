var User = require('../models/users.js')

function newUser(req, res){
	var person = new User ({
		name : req.body.name, 
		company : req.body.company, 
		blog: req.body.blog, 
		location: req.body.location, 
		email: req.body.email, 
		avatar: req.body.avatar_url, 
		github: req.body.html_url,
	})
	person.save(function(err, user){
		if(err){
			console.log('save error', err)
			res.send({err:err})
		}
		else{
			console.log('user saved', user)
			res.json(user)
		}
	})
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

module.exports = {
	newUser: newUser, 
	updateUser: updateUser,
	getUpdate: getUpdate,
}