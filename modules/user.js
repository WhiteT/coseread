var mongodb = require('mongodb').Db;
var settings = require('../settings');

function User(user) {
  this.name = user.name;
  this.pwd = user.pwd;
  this.type = user.type;
}

function User(_name, _pwd, _type) {
  this.name = _name;
  this.pwd = _pwd;
  this.type = _type;
}

User.prototype.register = function(callback) {
  var user = {
    name: this.name,
    pwd : this.pwd,
    type: 'user'
  };
  mongodb.connect(settings.url, function(err, db) {
    if (err) {
      db.close()
      return callback(err);
    }
    db.collection("users", function(err, collection) {
      if (err) {
        db.close();
        return callback(err);
      }
      collection.ensureIndex("name", {unique: true}, function(err) {
        return callback(err);
      });
      
      collection.save(user, {safe:true}, function(err, user) {
        db.close();
        callback(err, user);
      });
    });
  });
};

User.get = function(username, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    db.collection("users", function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({name: username}, function(err, doc) {
        mongodb.close();
        var user = User(doc);
        callback(err, doc);
      });
    });
  });
};

module.exports = User;