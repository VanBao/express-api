const sha256 = require("sha256");
const moment = require("moment");
let querystring = require('qs');

class vnPay {
    constructor() {
        this.sha256 = sha256;
        this._param = {
            vnp_Version: "2",
            vnp_Command: "pay",
            vnp_TmnCode: "",
            vnp_Amount: "",
            vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
            vnp_CurrCode: "VND",
            vnp_IpAddr: "::1",
            vnp_Locale: "vn",
            vnp_OrderInfo: "Thanh toan booking",
            vnp_OrderType: "topup",
            vnp_ReturnUrl: global.config.vnPay.vnp_ReturnUrl,
            vnp_TxnRef: "DEMO_121",
        };
        this._secure = {
            vnp_SecureHashType: "",
            vnp_SecureHash: ""
        };
        this._param_info = {
            vnp_TmnCode: "",
            vnp_Amount: "",
            vnp_BankCode: "",
            vnp_BankTranNo: "",
            vnp_CardType: "",
            vnp_PayDate: "",
            vnp_CurrCode: "",
            vnp_OrderInfo: "",
            vnp_TransactionNo: "",
            vnp_ResponseCode: "",
            vnp_TxnRef: ""
        };
    }

    createUrl(vnp_Url) {
        let vnpUrl = vnp_Url ? vnp_Url : global.config.vnPay.vnp_Url;
        let vnp_Params;
        // vnp_Params = { ...this._param,...this._secure};
        vnp_Params = Object.assign(this._param, this._secure);
        // console.log(vnp_Params)
        vnpUrl += '?' + querystring.stringify(vnp_Params, {encode: true});
        return vnpUrl;
    }

    createUrlIPN(data) {
        let vnpUrl = global.config.vnPay.vnp_ipn;
        let vnp_Params;
        vnp_Params = Object.assign(data, this._secure);
        // console.log(vnp_Params)
        vnpUrl += '?' + querystring.stringify(vnp_Params, {encode: true});
        return vnpUrl;
    }

    setRef(code) {
        this._param.vnp_TxnRef = code;
    }

    setInformationOrder(amount) {
        this._param.vnp_Amount = amount * 100;

    }

    setConfig(TmnCode, Secret) {
        this._param.vnp_TmnCode = TmnCode;
        this._param = this.sortObject(this._param);

        let signData = Secret + querystring.stringify(this._param, {encode: false});
        let secureHash = sha256(signData);
        this._secure.vnp_SecureHash = secureHash;
        this._secure.vnp_SecureHashType = "SHA256";
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


    checkTransaction(data, secretKey) {
        delete data['code-agent'];
        delete data['transactionID'];
        delete data['mod'];
        let secureHash = data['vnp_SecureHash'];
        delete data['vnp_SecureHash'];
        delete data['vnp_SecureHashType'];
        data = this.sortObject(data);
        let signData = secretKey + querystring.stringify(data, {encode: false});
        let checkSum = sha256(signData);
        if (secureHash === checkSum) {
            this._secure.vnp_SecureHash = secureHash;
            this._secure.vnp_SecureHashType = "SHA256";
            return this.createUrlIPN(data);
            return {RspCode: '00', Message: 'success'}
        } else {
            return {RspCode: '97', Message: 'Fail checksum'}
        }
    }

}

module.exports = vnPay;
