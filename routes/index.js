var Book = require('../modules/book');
var User = require('../modules/user');

exports.index = function(req, res) {
  var sess = req.session
  if (!sess.username) {
    Book.find(function(err, books) {      
      res.render('index.ejs', {
        books: books,
        title: '人丑就要多看书',
        session: sess
      })
    })
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      session: sess
    })
  }
};

exports.register = function(req, res) {
  var sess = req.session;
  if (!sess.username) {
    res.render('preview.ejs', {
      progress: '注册',
      session: sess
    });    
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      session: sess
    });
  }
};

exports.login = function(req, res) {
  var sess = req.session;
  if (!sess.username) {
    res.render('preview.ejs', {
      progress: '登陆',
      session: sess
    });
  }
  else {
    res.render('admin.ejs', {
      title: "admin",
      session: sess
    });
  }
};

exports.checkLogin = function(req, res) {
  var uname = req.body.username,
      upwd  = req.body.userpwd;
  // console.log("uname: " + uname);
  // console.log("upwd : " + upwd);

  var sess = req.session;
  if (!sess.username) {
    sess.username = uname;
    sess.ip = req.ip;
  }
  res.json('success');
  
};

function isalpnum(str) {
  var regex = new RegExp(/^[a-zA-Z]+[0-9a-zA-Z]*$/);
  return regex.test(str);
}

function valideLength(str) {
  if (str.length>=4 && str.length<=16)
    return true;
  return false;
}

exports.checkRegister = function(req, res) {
  var newUser = new User(
    req.body.username,
    req.body.userpwd
  );
  if (!valideLength(newUser.name) && !valideLength(newUser.pwd)) {
    return res.json('1');
  }
  if (!isalpnum(newUser.name) && !isalpnum(newUser.pwd)) {
    return res.json('1');
  }
  User.get(newUser.name, function(err, user) {
    if (user)
      err = '用户已经存在'; // have already existed
    if (err) {
      // console.log(err);
      // req.flash('error', err);
      return res.json('0');
    }
    newUser.register(function(err) {
      if (err) {
        // req.flash('error', err);
        // return res.redirect('/register');
        return res.json('1');
      }
      req.session.username = newUser.name;
      // req.flash('success', '注册成功啦'); // success code
      // return req.redirect('/');
      return res.json('2');
    });
  });
};