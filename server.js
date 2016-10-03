'use strict';

const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const app = express()
const port = process.env.PORT || 3000
const routes = require('./index')

app.set('port', port)
app.set('view engine', 'pug')

//logger middleware
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${chalk.cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

//middlewares
app.use(express.static('public'))
app.use(routes)

//
app.listen(port, () =>
      console.log(`Listening on port: ${port}`)
)
