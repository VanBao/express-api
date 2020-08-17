'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const cors = require('cors');
const app = express();
const device = require('express-device');
const requestIp = require('request-ip');
const path = require('path');
const helmet = require('helmet');
require('./src/cors/global');

app.use(timeout(5 * 60 * 1000));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(device.capture());
app.use(requestIp.mw());
app.use(express.static('uploads'));
app.use(helmet());
let htmlPath = path.join(__dirname, '.well-known');
app.use('/.well-known', express.static(htmlPath));

app.all('/', function (request, response) {
    response.send({status: true, msg: "Welcome to  API!", code: 0, data: []});
});

app.all('/:act', [global.checkLoginMiddleware, global.verifyTokenMiddleware], async function (request, response) {
    try {
        request.body.fcode = request.headers['fcode'] ? parseInt(request.headers['fcode']) : 0;
        request.body.device = request.device.type.toUpperCase().trim();
        request.body.requestIp = request.clientIp;
        let act = request.params.act.replace(/[^a-z0-9\_\-]/i, '').toLowerCase();
        let mod = request.mod;
        let nameRole = request.body.userInfo ? request.body.userInfo.group_id : '';
        let checkPermission = global.checkPermission.check_function(request.method, act, mod, nameRole);
        request.body.files = request.files ? request.files : '';
        if (checkPermission) {
            let controller = require('./src/modules/' + act + '/controller');
            if ((controller) && (controller[mod])) {
                let query = request.body;
                query.param = request.query;
                try {
                    let data = await controller[mod](query);
                    response.send(data);
                } catch (ex) {
                    console.log(ex);
                    response.send({status: false, msg: "error", code: 700, data: [ex]});
                }
            } else {
                response.send({status: false, msg: "error", code: 703, data: []});
            }
        } else {
            response.send({status: false, msg: "error", code: 701, data: []});
        }
    } catch (sys) {
        console.log(request.params.act, sys);
        response.send({status: false, msg: "error", code: 700, data: sys});
    }
});

app.listen(4000, function () {
    console.log("API Init Completed.");
})
