var Book = require('../modules/book');

exports.index = function(req, res) {
  Book.find(function(err, books) {
    res.render('index.ejs', {
      books: books,
      title: '人丑就要多看书'
    });
  });
};

exports.register = function(req, res) {
  res.render('preview.ejs', {
    progress: '注册'
  });
};

exports.login = function(req, res) {
  res.render('preview.ejs', {
    progress: '登陆'
  });
};

