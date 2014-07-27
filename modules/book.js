var mongodb = require('mongodb').Db;
var settings = require('../settings');


function Book(_name, _genre, _subjection, _author) {
  this.name = _name;
  this.genre = _genre;
  this.subj = _subjection;
  this.author = _author;
};

Book.find = function(callback) {
  mongodb.connect(settings.url, function (err, db) {
    if (err) {
      db.close();
      return callback(err);
    }
    db.collection("books", function(err, collection) {
      if (err) {
        db.close();
        return callback(err);
      }
      collection.find().toArray(function(err, docs) {
        if (err) {
          return callback(err);
        }
        db.close();
        var books = [];
        docs.forEach(function(book, index) {
          var foundBook = new Book(book.name, book.genre, book.subj, book.author);
          books.push(foundBook);
        });
        callback(err, books);
      });
    });
  });
};

module.exports = Book;