var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	name : String,
	company : String, 
	blog : String,
	location: String, 
	email : String, 
	bio : String, 
	avatar : String,
	github : String,
	login: String, 

})

module.exports = mongoose.model('User', userSchema)