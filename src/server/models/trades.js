const mongoose = require("mongoose");

const tradesSchema = new mongoose.Schema({
    user: String,
    tradeData: Date,
    number: Number,
    security: String,
    securityFactor: Number,
    openPrice: Number,
    closePrice: Number,
    signals: Array
});

module.exports = mongoose.model('Trades', tradesSchema);