var express = require('express');
var apiRouter = express.Router();
var User = require('../app/models/user');
apiRouter.route('/user')
  .post(function(req,res) {
    var user = new User(req.body);
    user.save(function(err,user){
      if (err) throw err;
      res.status(201).json(user);
    });
  });
module.exports = apiRouter;
