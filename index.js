'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  console.log('Requested /');
  res.render('./login')
})

module.exports = router
