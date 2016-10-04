'use strict';

const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { connect } = require('./database')

const app = express()

const port = process.env.PORT || 3000
const {router} = require('./index')

app.set('port', port)
app.set('view engine', 'pug')

//logger middleware
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${chalk.cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
	store: new RedisStore({
    url: process.env.REDIS_URL || "redis://localhost:7777"
  }),
  resave: false,
  saveUninitialized: false,
	secret: 'secret'
}))

app.use((req, res, next) => {
	app.locals.username = req.session && req.session.username
	next()
})

//routers
app.use(router)

//
connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
    )
  })
  .catch(console.error)
