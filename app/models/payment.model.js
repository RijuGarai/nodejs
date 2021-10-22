const dbConn = require('../../config/db.config')

const payment = (pay)=>{
    this.payment_method = pay.payment_method;
    this.item_name = pay.item_name;
    this.sku = pay.sku;
    this.price = pay.price;
    this.currency = pay.currency;
    this.quantity = pay.quantity;
    this.total = this.price * this.quantity;
    this.description = pay.description;

}