const mongoose = require('mongoose');

const tradesSchema = new mongoose.Schema({

    user: String,
    tradeData: Date,
    number: Number,
    security: String,
    factor: Number,
    openPrice: Number,
    closePrice: Number,
    signals: Array,
    capacity: Number,
    result: Number

});

module.exports = mongoose.model('Trades', tradesSchema);
