var express = require('express');
var apiRouter = express.Router();
var User = require('../app/models/user');

apiRouter.route('/user')
  .post(function(req,res) {
    var user = new User(req.body);
    user.save(function(err,user){
      if (err) throw err;
      console.log('saved:', user);
      res.status(201).json(user);
    });
  })
  .get(function(req,res) {
    console.log(req.query);
    User.find({
    })
    .sort({age: req.query.order})
    .limit(req.query.paginate)
    .exec(function(err,users){
      if (err) throw err;
      res.status(200).json(users);
    });
  });
module.exports = apiRouter;
