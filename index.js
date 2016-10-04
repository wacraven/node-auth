'use strict';

const chalk = require('chalk')
const { Router } = require('express')
const router = Router()
const User = require('./models/user');
let errMsg

router.get('/', (req, res) => {
  res.render('./login')
})

router.post('/', (req, res, err) => {
  User
    .findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          // req.session.user = user
          res.render('index')
        } else {
          console.log(`Login attempt from username: "${req.body.username}": ${chalk.red('Error')}: passwords didn't match`)
          errMsg = "Username or Password didn't match"
          res.render('login', {errMsg})
        }
      } else {
        console.log(`Login attempt from username: "${req.body.username}": ${chalk.red('Error')}: username not found`)
        errMsg = "Username or Password didn't match"
        res.render('login', {errMsg})
      }
    })
  }
)

router.get('/register', (req, res) => {
  res.render('./register')
})


router.post('/register', (req, res, err) => {
  User
    .create(req.body)
    .then(() => res.redirect('./index'))
    .catch(err)
})

router.get('/index', (req, res) => {
  res.render('./index')
})

router.post('/index', (req, res) => {
  res.render('./logout')
})


module.exports = {router}
