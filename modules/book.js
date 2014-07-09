var mongodb = require('./db');

function Book(_name, _genre, _subjection, _author) {
  this.name = _name;
  this.genre = _genre;
  this.subj = _subjection;
  this.author = _author;
};

Book.find = function(callback) {
  mongodb.open(function (err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    db.collection("books", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.find().toArray(function(err, docs) {
        if (err) {
          return callback(err);
        }
        var books = [];
        docs.forEach(function(book, index) {
          var foundBook = new Book(book.name, book.genre, book.subj, book.author);
          books.push(foundBook);
        });
        mongodb.close();
        return callback(null, books);
      });
    });
  });
};

module.exports = Book;