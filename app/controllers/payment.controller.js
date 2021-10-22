const express = require('express');
const paypal = require('paypal-rest-sdk');
const url = require('url');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AV5FkSM7zcYinDfd7Dn_TOOno1Trx5i8siyZ3Y1bk20rk_shsRK6I_W7DBmKkfkUNfj0zB9LkpvriZDq',
    'client_secret': 'EMluw079o5Z_NJuQz_mmAb2xeqcNBSkyWWM8NPq9Ita496oeAM8Ce-S95Agg8Os0asW6YH5sGEBAM4Kj'
  });
var transaction = {};
var addr = '';
var payment_id = '';
var payer_id = ''; 
exports.paymentCreate = (req, res) => {
    console.log(req.body)
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:4500/success",
          "cancel_url": "http://localhost:4500/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": req.body.item_name,
                  "sku": req.body.sku,
                  "price": req.body.price,
                  "currency": req.body.currency,
                  "quantity": req.body.quantity
              }]
          },
          "amount": {
              "currency": req.body.currency,
              "total": req.body.price * req.body.quantity
          },
          "description": req.body.description
      }]
    // "transactions": [{
    //     "item_list": {
    //         "items": [{
    //             "name": "Redhock Bar Soap",
    //             "sku": "001",
    //             "price": "25.00",
    //             "currency": "USD",
    //             "quantity": 1
    //         }]
    //     },
    //     "amount": {
    //         "currency": "USD",
    //         "total": "25.00"
    //     },
    //     "description": "Washing Bar soap"
    // }]
  };
  
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        transaction = payment.transactions[0].amount;
        console.log(transaction);
        console.log({data:payment.transactions[0]});
        for(let i = 0;i < payment.links.length;i++){
          if(payment.links[i].rel === 'approval_url'){
              console.log(payment.links.length)
            //res.redirect(payment.links[i].href);

            res.send({url:payment.links[i]});
          }
        }
    }
  });
  
  };

  
  exports.paymentExecute = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": transaction
      }]
    };
    console.log(JSON.stringify(execute_payment_json));
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          const paym = payment.payer;
          console.log({data:paym.payer_info.email});
         // res.send({payment_status:'Success'});
          res.send({paymentState:payment.state});
      }
  });
  };
  exports.paymentCancelled = (req, res) => res.send('Cancelled');