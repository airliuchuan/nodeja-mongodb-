var wsm1 = require('../schema/wsm1.js');
var mongoose = require('mongoose');

var Wsm1 = mongoose.model('Wsm1', wsm1);

module.exports = Wsm1;
