var daoge = require('../schema/daoge.js');
var mongoose = require('mongoose');

var Daoge = mongoose.model('Daoge', daoge);

module.exports = Daoge;

