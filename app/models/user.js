var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);

