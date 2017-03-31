var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var User = require('./model/user.js');
var Daoge = require('./model/daoge.js');
var Wsm1 = require('./model/wsm1.js');
var port = process.env.PORT || 3000;
var dbUrl = 'mongodb://localhost:27017/wsm1';

var app = express();

//设置跨域访问
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://vshow30.net");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.set('views','views');
app.set('view engine', 'jade');

mongoose.connect(dbUrl, function(err) {
	if(!err) {
		console.log('connected to mongodb');
	}else {
		throw err
	}
});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

// app.use(express.static(path.join(__dirname,'wangnan')));
app.use(cookieParser());//启动cookie
app.use(session({
	secret: 'moralapp',
	store: new MongoStore({//session持久化功能实现
        url: dbUrl,//mongodb的链接地址
        collection: 'sessions'
    }),
	resave: false,
	saveUninitialized: true
}));

app.get('/user',function(req, res , next) {
	res.end('登录名' + req.session.id);
});

app.post('/getuserlist', urlencodedParser, function(req, res) {

	res.header("Access-Control-Allow-Origin", "http://vshow30.net");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json;charset=utf-8");

	userdata = {
		"sessionid": req.session.id,
		"right": req.body.right,
		"middle": req.body.middle,
		"bottom": req.body.bottom,
		"screens": req.body.screen,
		"begin": req.body.begin,
		"time": req.body.over / 1000
	};
	
	var user = new User(userdata);
	
	User.find({"sessionid":userdata.sessionid}, function(err, docs) {
	   console.log("length == > " + docs.length);
	   if (err) {
		     console.log('err:', err);
		     return;
	   } else if(docs.length > 0){
		     User.update({"sessionid":userdata.sessionid},{$set: {right: userdata.right,middle: userdata.middle, bottom: userdata.bottom, screens: userdata.screens,begin: userdata.begin, time: userdata.time}},function(err){
		     console.log('update status:', err ? err : 'success');
		    });
	   } else {
		    user.save(function(err) {    // 执行保存，并查看返回情况
		       console.log('save status:', err ? err : 'success');
		  	});
	   }
	 });
	 res.end('user');
})

app.post('/getdaoge', urlencodedParser, function(req, res) {

	res.header("Access-Control-Allow-Origin", "http://www.slz2017.net");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json;charset=utf-8");

	userdata = {
		"sessionid": req.session.id,
		"right": req.body.right,
		"middle": req.body.middle,
		"bottom": req.body.bottom,
		"screens": req.body.screen,
		"begin": req.body.begin,
		"time": req.body.over / 1000
	};
	
	var daoge = new Daoge(userdata);
	
	Daoge.find({"sessionid":userdata.sessionid}, function(err, docs) {
	   console.log("length == > " + docs.length);
	   if (err) {
		     console.log('err:', err);
		     return;
	   } else if(docs.length > 0){
		     Daoge.update({"sessionid":userdata.sessionid},{$set: {right: userdata.right,middle: userdata.middle, bottom: userdata.bottom, screens: userdata.screens,begin: userdata.begin, time: userdata.time}},function(err){
		     console.log('update status:', err ? err : 'success');
		    });
	   } else {
		    daoge.save(function(err) {    // 执行保存，并查看返回情况
		       console.log('save status:', err ? err : 'success');
		  	});
	   }
	 });
	 res.end('daoge');
})

app.post('/getwsm1', urlencodedParser, function(req, res) {

	res.header("Access-Control-Allow-Origin", "http://vshow30.net");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Content-Type", "application/json;charset=utf-8");

	userdata = {
		"sessionid": req.session.id,
		"right": req.body.right,
		"middle": req.body.middle,
		"bottom": req.body.bottom,
		"screens": req.body.screen,
		"begin": req.body.begin,
		"time": req.body.over / 1000
	};
	
	var wsm1 = new Wsm1(userdata);
	
	Wsm1.find({"sessionid":userdata.sessionid}, function(err, docs) {
	   console.log("length == > " + docs.length);
	   if (err) {
		     console.log('err:', err);
		     return;
	   } else if(docs.length > 0){
		     Wsm1.update({"sessionid":userdata.sessionid},{$set: {right: userdata.right,middle: userdata.middle, bottom: userdata.bottom, screens: userdata.screens,begin: userdata.begin, time: userdata.time}},function(err){
		     console.log('update status:', err ? err : 'success');
		    });
	   } else {
		    wsm1.save(function(err,data) {    // 执行保存，并查看返回情况
		       console.log('save status:', err ? err : 'success');
		  	});
	   }
	 });
	 res.end('wsm1');
})

// app.get('/', function(req,res) {
// 	res.sendFile(__dirname + '/wangnan/' + 'index.html');
// })

app.listen(port,function(){
	console.log('server stated ' + port);
})
