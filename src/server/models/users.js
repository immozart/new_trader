const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    signals: [Array],
    securities: [Array]

});

module.exports = mongoose.model('User', userSchema);