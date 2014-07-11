var Book = require('../modules/book');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser());
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({
  secret: 'ipp',
  cookie: { 
    maxAge: 24*60*60*1000
  }
}));

exports.index = function(req, res) {
  var sess = req.session
  if (!sess.username) {
    Book.find(function(err, books) {
      
      res.render('index.ejs', {
        books: books,
        title: '人丑就要多看书',
        session: false
      })
    })
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      username: sess.username,
      session: true
    });
  }
};

exports.register = function(req, res) {
  var sess = req.session
  if (!sess.username) {
    res.render('preview.ejs', {
      progress: '注册',
      session: false
    });    
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      username: sess.username,
      session: true
    })
  }
};

exports.login = function(req, res) {
  var sess = req.session
  if (!sess.username) {
    res.render('preview.ejs', {
      progress: '登陆',
      session: false
    });
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      username: sess.username,
      session: true
    })
  }
};

exports.checklogin = function(req, res) {
  var uname = req.body.username,
      upwd  = req.body.userpwd;
  console.log("uname: " + uname);
  console.log("upwd : " + upwd);
  var sess = req.session
  if (!sess.username) {
    sess.username = uname;
    sess.ip = req.ip;
  }
  res.json('success');
  
};