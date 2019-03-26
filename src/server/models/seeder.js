const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/new_traider', { useNewUrlParser: true });
const express = require('express');
const router = express.Router();
const User = require('./users');
const Trades = require('./trades');
const faker = require('faker');

async function seed() {
    let tmpBUM = ''
    let securityFactor = 1;
    let securitysArr = ['SBER', 'GAZP', 'BR'];
    let signalsArr = [];
    for (let i = 0; i < 30; i++) {
        signalsArr = [];

        for (let j = 0; j < 10; j++) {
            signalsArr.push(Math.round(Math.random()))
        }

        tmpBUM = 'USD';
        securityFactor = 1;
        if (i % 2 === 0) { tmpBUM = securitysArr[0]; securityFactor = 10; }
        if (i % 3 === 0) { tmpBUM = securitysArr[1]; securityFactor = 100; }
        if (i % 4 === 0) { tmpBUM = securitysArr[2]; securityFactor = 50; }

        let openPrice = faker.random.number({ min: 95, max: 105 });
        let closePrice = faker.random.number({ min: 95, max: 105 });
        let capacity = faker.random.number({ min: -3, max: 3 });
        capacity ? capacity = capacity : capacity = 1;

        const trade = await new Trades({
            user: 'traider',
            tradeData: faker.date.past(),
            number: i + 1,
            security: tmpBUM,
            factor: securityFactor,
            openPrice: openPrice,
            closePrice: closePrice,
            signals: signalsArr,
            capacity: capacity,
            result: (closePrice - openPrice) * securityFactor * capacity
        })
        await trade.save();
        console.log(i, trade)
    }
    console.log('done!')
};
seed()
// router.get('/', (req, res) => {
//     res.render('superseeds')
// });

// router.post('/', async (req, res) => {
//     await seed();
//     res.redirect('/superseeds');
// });
// module.exports = router;