const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  signals: Array,
  securities: Array
});

module.exports = mongoose.model('Users', usersSchema);
