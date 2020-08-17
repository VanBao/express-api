const paypal = require('paypal-rest-sdk');

class hp_paypal {
    constructor() {
        this.paypal = paypal;
        paypal.configure(global.config.paypal_cf);
        this.create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": global.config.paypal_return_path.return_url,
                "cancel_url":  global.config.paypal_return_path.cancel_url
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": 0
                },
                "item_list": {
                    "items": [{
                        "name": '',//global.format.getTextLang(dataLang, 'lbl_PaymentNameBookingFlight'),
                        "sku": '',//detail_booking.Id.toString(),
                        "price": 0,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "description": '',//detail_booking.ContactName + " Payment booking from " + detail_booking.DepartureAirportCode + " to " + detail_booking.DestinationAirportCode,
                "custom": '',//detail_booking.Id.toString(),
            }],

        };
    }

    setDataCreate(itemName,itemSku,price,description){
        this.create_payment_json.transactions[0].custom=itemSku;
        this.create_payment_json.transactions[0].description=description;
        this.create_payment_json.transactions[0].amount.total=parseFloat(price);
        this.create_payment_json.transactions[0].item_list.items[0].sku=itemSku;
        this.create_payment_json.transactions[0].item_list.items[0].price=price;
        this.create_payment_json.transactions[0].item_list.items[0].name=itemName;
    }

    create_pl(create_payment_json) {
        return new Promise((resolve) => {
            this.paypal.payment.create(this.create_payment_json, function (error, payment) {
                if (error) {
                    resolve({
                        status: false, error
                    });
                } else {
                    resolve({
                        status: true, payment
                    });
                }
            });
        });

        // return this.paypal.payment.create(create_payment_json);
    }

    execute_pl(paymentId, execute_payment_json) {
        return new Promise((resolve) => {
            this.paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                if (error) {
                    resolve({
                        status: false, error
                    });
                } else {
                    resolve({
                        status: true, payment
                    });
                }
            });
        });
    }

    get_pl(paymentId){
        return new Promise((resolve) => {
            this.paypal.payment.get(paymentId, function (error, payment) {
                if (error) {
                    resolve({
                        status: false, error
                    });
                } else {
                    resolve({
                        status: true, payment
                    });
                }
            });
        });
    }
}

module.exports = hp_paypal;
