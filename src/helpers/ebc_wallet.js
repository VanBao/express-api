// const jwt = require('jsonwebtoken');
// const jwkToPem = require('jwk-to-pem')
// const sha256 = require('sha256');
const crypto = require("crypto");

class myebc {
    constructor() {
        // this.urlConfiguration = "https://myebc.io/.well-known/openid-configuration/jwks";
        this.base_ul = "https://api.ebcwallet.io";
        this.key = {
            // primary: "MHPpFAPDzJLP7pZ0",
            // secret: "91dAxmrBZH6HmeeTFlq0oBNjDDsNSCrX",
            primary: "NOuf9M3atFJaF1PE",
            secret: "LUj4tfPIkV5xvaml33uFLshiiqQwvPz2"
        };
        this.numberAddress = 100;
        this.header = {};
        this.listAccount = [];
    }

    async getKey(path, METHOD) {
        let TIMESTAMP = global.format.timestamp();
        // return {key,TIMESTAMP};
        let hash = crypto.createHmac('sha256', this.key.secret)
            .update(TIMESTAMP + METHOD + path).digest('hex');
        let header = {
            "Content-Type": "application/json",
            "CB-ACCESS-KEY": this.key.primary,
            "CB-ACCESS-SIGN": hash,
            "CB-ACCESS-TIMESTAMP": TIMESTAMP
        };
        this.header = header;
    }

    //List Accounts
    async getListAccount() {
        this.getKey("/api/accounts", "GET");
        let dataListAccount = await global.Request.getAbay(this.base_ul + "/api/accounts", {headers: this.header});
        this.listAccount = JSON.parse(dataListAccount.body).data;
        return this.listAccount;
    }

    async createAddress(COIN, numberAddress = 100) {
        this.numberAddress = numberAddress;
        //get id ebc
        let id_ebc = await global.db()("tblCoinPayment").select("ID_EBC").where("Code", COIN).first();
        if (!id_ebc) {
            return {status: false};
        }
        // return id_ebc;
        for (let i = 0; i < this.numberAddress; i++) {
            let pathCreate = "/api/accounts/" + id_ebc.ID_EBC + "/addresses";
            // return pathCreate;
            this.getKey(pathCreate, "POST");
            let createAddress = await global.Request.postAmedeus(this.base_ul + pathCreate, {
                label: global.format.random_string()
            }, {headers: this.header});
            if (createAddress && createAddress.status === "success") {
                let dataInsert = {
                    Address: createAddress.data.address,
                    CoinCode: COIN,
                    Status: 0,
                    Note: JSON.stringify(createAddress)
                };
                await global.db()("tblWalletCoinSystem").insert(dataInsert);
            }
        }
        return true;


    }

    async getAllAddress(COIN) {
        let id_ebc = await global.db()("tblCoinPayment").select("ID_EBC").where("Code", COIN).first();
        if (!id_ebc) {
            return {status: false};
        }
        let pathCreate = "/api/accounts/" + id_ebc.ID_EBC + "/addresses";
        this.getKey(pathCreate, "GET");
        let createAddress = await global.Request.getAbay(this.base_ul + pathCreate, {headers: this.header});
        let listEBC = JSON.parse(createAddress.body);
        // for (let item of listEBC.data) {
        //     let dataInsert = {
        //         Address: item.address,
        //         CoinCode: COIN,
        //         Status: 0,
        //         Note: JSON.stringify(item)
        //     };
        //     await global.db()("tblWalletCoinSystem").insert(dataInsert);
        // }
        return listEBC;
    }
}

module.exports = myebc;
