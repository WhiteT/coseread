
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
// var connect = require('connect');
// var MongoStore = require('connect-mongo')(express);
var app = express();
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  secret: 'ipp',
  cookie: { 
    maxAge: 24*60*60*1000
  }
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


app.get('/', routes.index);
app.get('/register', routes.register);
app.get('/login', routes.login);

app.post('/admin/login/', routes.checklogin);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
