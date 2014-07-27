
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var settings = require('settings');
// var flash = require('connect-flash');
// var connect = require('connect');
// var MongoStore = require('connect-mongo')(express);
var app = express();
// app.use(flash());
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: settings.cookieSecret,
  cookie: { 
    maxAge: 24*60*60*1000
  },
  url: settings.url
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendors')));
// development only
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
}

app.use(function(req, res, next) {
  res.locals.username = req.session.username;

  // var err = req.flash('error');
  // var succ = req.flash('success');

  // res.locals.error = err.length ? err : null;
  // res.locals.success = succ.length ? succ : null;
  next();
});



app.get('/', routes.index);
app.get('/register', routes.register);
app.get('/login', routes.login);

app.post('/register/check', routes.checkRegister);
app.post('/login/check', routes.checkLogin);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
