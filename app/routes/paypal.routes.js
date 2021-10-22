const express = require('express');
const paypal = require('paypal-rest-sdk');
const router = express.Router();
const controller = require('../controllers/payment.controller')
router.post('/pay',controller.paymentCreate);
router.get('/success',controller.paymentExecute);
router.get('/cancel',controller.paymentCancelled);

module.exports = router;