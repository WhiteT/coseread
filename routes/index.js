var Book = require('../modules/book');
var User = require('../modules/user');
var url = require('url')
var queryString = require('querystring')

exports.index = function(req, res) {
  var sess = req.session
  if (!sess.username) {
    Book.find(function(err, books) {      
      res.render('index.ejs', {
        books: books,
        title: '软院子',
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
  console.log('uname ' + uname)
  console.log('upwd  ' + upwd)
  if (uname==undefined || upwd==undefined || uname==null || upwd==null) {
     return res.json('l1')
  }
  if (uname.length<4 || upwd.length<4) {
    return res.json('l2')
  }

  User.get(uname, function(err, user) {
    if (err) {
      return res.json('l3')
    }
    var sess = req.session;
    if (!sess.username) {
      sess.username = uname;
      sess.ip = req.ip;
    }
    
    return res.json('l0');
  })
  
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
    return res.json('r1');
  }
  if (!isalpnum(newUser.name) && !isalpnum(newUser.pwd)) {
    return res.json('r1');
  }
  User.get(newUser.name, function(err, user) {
    if (err) {
      return res.json('r1');
    }
    newUser.register(function(err) {
      if (err) {
        return res.json('r2');
      }
      req.session.username = newUser.name;
      return res.json('r3');
    });
  });
};