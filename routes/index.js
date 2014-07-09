exports.index = function(req, res) {
  res.render('index.ejs', {
    title: '人丑就要多看书'
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

