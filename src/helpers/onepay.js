let querystring = require('qs');
class onePay {
    constructor() {
        this._param = {
            vpc_Version: global.config.onePay.vpc_Version ?  global.config.onePay.vpc_Version : '',
            vpc_Currency: global.config.onePay.vpc_Currency ? global.config.onePay.vpc_Currency : '',
            vpc_Command: global.config.onePay.vpc_Command ? global.config.onePay.vpc_Command : '',
            vpc_AccessCode: global.config.onePay.vpc_AccessCode ?  global.config.onePay.vpc_AccessCode : '',
            vpc_Merchant: global.config.onePay.vpc_Merchant ? global.config.onePay.vpc_Merchant : '',
            vpc_Locale : global.config.onePay.vpc_Locale ? global.config.onePay.vpc_Locale : '',
            vpc_ReturnURL: global.config.onePay.vpc_ReturnURL ? global.config.onePay.vpc_ReturnURL : '',
            Title: global.config.onePay.Title ? global.config.onePay.Title : '',
        };

        this.secure_secret = '';
        this._param_info = {
            vpc_MerchTxnRef: "",
            vpc_OrderInfo: "",
            vpc_TicketNo: "",
            vpc_Amount: "0",
            vpc_Customer_Phone: "",
            vpc_Customer_Email: "",
            vpc_Customer_Id: "",
            // vpc_SecureHash: "",
            vpc_SHIP_Street01: "",
            vpc_SHIP_Provice: "",
            vpc_SHIP_City: "",
            vpc_SHIP_Country: "",
        }; 
    }

    sortObject(o) {
        var sorted = {},
            key, a = [];

        for (key in o) {
            if (o.hasOwnProperty(key)) {
                a.push(key);
            }
        }

        a.sort();

        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }


    async createUrl(paymentUrl) {
        let url = (paymentUrl ? paymentUrl : global.config.onePay.virtualPaymentClientURL) + "?";
        //let params = { ...this._param,...this._param_info};
        let params = Object.assign(this._param, this._param_info);
        params = this.sortObject(params);
        let stringHashData = '';
        for (let [key, value] of Object.entries(params)) {
            if ((value.length > 0) && ((key.substr(0,4)== "vpc_") || (key.substr(0,5) =="user_"))) {
                stringHashData += key + "=" + value + "&";
            }
        }
        stringHashData = stringHashData.substring(0, stringHashData.length - 1);
        let response = JSON.parse(await global.requets.post(global.config.onePay.hashDataApi, {
            key : this.secure_secret,
            data :  stringHashData
        }));
        if(response['status'] == true){
            params['vpc_SecureHash'] = response['data'];
        }
        url += querystring.stringify(params, {encode: true});
        return {url: url, hashData: stringHashData};
    }

    setOrderInfo(orderInfo) {
        if(orderInfo.vpc_Amount) this._param_info.vpc_Amount = orderInfo.vpc_Amount + "00";
        if(orderInfo.vpc_TicketNo) this._param_info.vpc_TicketNo = orderInfo.vpc_TicketNo;
        if(orderInfo.vpc_Customer_Phone) this._param_info.vpc_Customer_Phone = orderInfo.vpc_Customer_Phone;
        if(orderInfo.vpc_Customer_Email) this._param_info.vpc_Customer_Email = orderInfo.vpc_Customer_Email;
        if(orderInfo.vpc_Customer_Id) this._param_info.vpc_Customer_Id = orderInfo.vpc_Customer_Id;
        if(orderInfo.agent && orderInfo.transactionID){
            this._param_info.vpc_OrderInfo = "Order" + Date.now() + "-" + orderInfo.agent + "-" + orderInfo.transactionID;
            this._param_info.vpc_MerchTxnRef = "Order" + Date.now() + "-" + orderInfo.agent + "-" + orderInfo.transactionID;
        }
    }

    setKey(arrKey) {
        if(arrKey.vpc_AccessCode) this._param.vpc_AccessCode = arrKey.vpc_AccessCode;
        if(arrKey.vpc_Merchant) this._param.vpc_Merchant = arrKey.vpc_Merchant;
        if(arrKey.secure_secret) this.secure_secret = arrKey.secure_secret;
    }
}

module.exports = onePay;
