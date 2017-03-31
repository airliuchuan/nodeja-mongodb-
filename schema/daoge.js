var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Daoge = new Schema({
	sessionid: String,
	right: Number,
	middle: Number,
	bottom: Number,
	screens: {type: Array, default: [1]},
	begin: String,
	time: String
});

module.exports = Daoge;
