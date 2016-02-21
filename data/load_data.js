var request = require('request');

var url = 'http://localhost:3000';

var users = require('./users');

function create(user) {
  return new Promise(function(resolve, reject) {
    request
    .post({
      url: url+'/api/user',
      form: user,
    },function(err,user) {
      if (err) {
        reject(err);
      } else {
        resolve(user.body);
      }
    });
  });
}

Promise.all(users.map(create))
.then(function(allUsers) {
  console.log(allUsers)
})
.catch(function(err) {
  console.error(err.message);
});
