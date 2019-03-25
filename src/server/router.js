/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const express = require('express');

const Users = require('./models/users');
const Trades = require('./models/trades');
const router = express.Router();


router.get('/data', async (req, res) => {
  const tradesInfo = await Trades.find();
  res.send({ tradesInfo: tradesInfo }); 
});


router.get('/user', async (req, res) => {
  const tradesInfo = await Trades.find();
  console.log('-------------------------------------------------------------------------------------')
  console.log(orderInfo)
  console.log('-------------------------------------------------------------------------------------')
  res.send({ tradesInfo: tradesInfo }); 
});

router.get('/posts', (req, res) => {
  setTimeout(() => res.send([
    { id: 1, title: 'First Post', description: 'The very best first post...' },
    { id: 2, title: 'Second Post', description: 'Dirty post :(' }
  ]), 1000);
});

// const usersArr = [
//   { login: 'mike', name: 'Michael Klishevich' },
//   { login: 'john', name: 'John King' }
// ];

// router.post('/login', (req, res) => {
//   console.log(JSON.stringify(req.body));
//   const requestUser = req.body.login;
//   const currentUser = usersArr.filter(el => el.login === requestUser)[0];
//   console.log('currentUser', currentUser);
//   setTimeout(() => {
//     if (currentUser) {
//       res.send(currentUser);
//     } else {
//       res.status(401);
//       res.send('401 UNAUTHORIZED');
//     }
//   }, 1000);
// });

export default router;
