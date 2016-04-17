var User = require('../models/users.js')
var s3 = require('s3')
var key = require('../models/key.js')
s3Client = s3.createClient({
	s3options:{
		accessKeyId: key.accessKeyId, 
		secretAccessKey: key.secretAccessKey,
	}
})
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
// function updateUser(req, res){
// 	console.log('controller log')
// 	User.findByIdAndUpdate({_id:req.body._id}, req.body, function(err, user){
// 		if(err){
// 			console.log('update error', err)
// 		}
// 		else{
// 			console.log('user updated', user)
// 			res.json(user)
// 		}
// 	})
function updateUser(req, res){
	if(req.file.data){
		console.log('update user file', req.files)
		var body = req.body.data
		var file = req.fules.data.file
		var uploader = s3Client.uploadFile({
			localFile.file.path, 
			s3Params: {
				Bucket: 'gitbizzy', 
				Key: file.name, 
				ACL: 'public-read',
			}
		})
		uploader.on('progress', function(){
			console.log('progress', uploader.progressAmount, uploader.progressTotal)
		})
		uploader.on('end', function(){
			var url = s3.getPublicUrlHttp('gitbizzy', file.name)
			console.log('url retrieved', url)
			User.findByIdAndUpdate({_id:body._id}, $set{
				name : body.name, 
				company : body.company, 
				blog: body.blog, 
				location: body.location, 
				email: body.email, 
				avatar: url, 
				github: body.profileUrl,
				login: body.username	
			}
			function(err, user){
				if(err){
					console.log('update err', err)
				}
				else{
					console.log('user updated', user)
					res.json(user)
				}
			})
		})
		else {
			console.log('no picture to update')
			User.findByIdAndUpdate({_id:req.body.data._id}, req.body.data, function(err, user){
				if(err){
					console.log('update error', err)
				}
				else {
					console.log('user updated', user)
					res.json(user)
				}
			})
		}
	}
}
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
function getUser(req, res){
	User.findOne({login:req.user.login}, function(err, user){
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
	getUser: getUser,
}