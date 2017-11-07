var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Message', MessageSchema);
