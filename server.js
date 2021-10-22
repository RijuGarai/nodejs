const express = require('express');
const paypal = require('paypal-rest-sdk');
const path = require('path');
const app = express();
const routes = require('./app/routes/paypal.routes');
const dbConn = require('./config/db.config')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/',routes);
app.use(express.static(path.join(__dirname,'public')));


const PORT  = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
module.exports = PORT;