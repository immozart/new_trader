const mongoose = require("mongoose");

const tradesSchema = new mongoose.Schema({
    user: [String],
    tradeData: [Date],
    security: [String],
    openPrice: [Number],
    closePrice: [Number],
    signals: [Array]
});

module.exports = mongoose.model('User', tradesSchema);