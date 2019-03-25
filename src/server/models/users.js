const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    signals: [Array],
    securities: [Array]
});

module.exports = mongoose.model('Users', usersSchema);