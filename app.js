const express = require('express'),
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	expressSession = require('express-session'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	index = require('./routes/index'),
	app = express(),
	mongoose = require('mongoose'),
	KEY = 'ola',
	secret = 'vaitomarnocu',
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	cookie = cookieParser(secret),
	store = new expressSession.MemoryStore();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/news');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookie);

 app.use(expressSession({
   secret: secret,
   name: KEY,
   resave: true,
   saveUninitialized: true,
   store: store
 }));

app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', index);

let rooms = [];
let pass = [];
let room;

app.post("/", function(req, res){
	let flag = true;
	for(var i=0; i < rooms.length; i++) {
		if(rooms[i] == req.body.room){
			flag = false;
			var position = i;
		}
	}
	if (flag) {
		req.session.nome = req.body.user;
		req.session.id = new Date();
		rooms.push(req.body.room);
		pass.push(req.body.pass);
		req.session.room = req.body.room;
		room = req.body.room;
		res.redirect('/');
	}else{
		if (req.body.pass == pass[position]) {
			req.session.nome = req.body.user;
			req.session.id = new Date();
			req.session.room = req.body.room;
			room = req.body.room;
			res.redirect('/');
		}else{
			res.render('login');
		}
	}
});
app.get("/", function(req, res){
	// Armazenando o nome na sessão.
   	if (req.session.nome != null) {
   		let data = {
   			nome : req.session.nome,
   			id : req.session.id,
   			room : req.session.room
   		}
   		res.render('index', data);
   	} else {
   		res.render('login');
   	}
});
 // Iniciando uma conexão com Socket.IO.
let all = [];
io.sockets.on('connection', function (client) {
 	//console.log(room);
 	client.join(room);
   	// Recuperando uma sessão Express.
   	var session = client.handshake.session;
	//client.emit('toClient', all);
    //client.broadcast.emit('toClient', all);
   	client.on('toServer', function (msg) {
    	let text = msg.text;
    	let name = session.nome;
    	let id = msg.id;
    	let data = {
    		name : name,
    		text : text,
    		id: id
    	}
    	console.log(msg.room);
    	all.push(data);
    	client.emit(msg.room, data);
    	client.broadcast.emit(msg.room, data);
   	});
 });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
io.use(function(socket, next) {
   var data = socket.request;
   cookie(data, {}, function(err) {
     var sessionID = data.signedCookies[KEY];
     store.get(sessionID, function(err, session) {
       if (err || !session) {
         return next(new Error('Acesso negado!'));
       } else {
         socket.handshake.session = session;
         return next();
       }
     });
   });
 });
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
 server.listen(3001, function(){
   console.log("Rodando o server!");
 });
module.exports = app;
