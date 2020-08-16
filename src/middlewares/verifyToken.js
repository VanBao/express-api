const jwt = require('jsonwebtoken');
module.exports = async function (req, res, next) {
    //check function have need token
    let mod = req.method == 'POST' || req.method == 'PUT' ? req.body.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : req.query.mod ? req.query.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '';
    req.mod = mod;
    if (global.authMethod.check_ignore(mod) == true) {
        next();
    } else {

        const bearerHeader = req.headers['authorization'];
        if (typeof  bearerHeader !== 'undefined' && bearerHeader.indexOf(' ') !== -1) {
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            let status = false;
            let done = false;
            jwt.verify(bearerToken, global.config.keySystem.key, function (err, authData) {
                if (!err) {
                    req.body.UID = authData.dataMain.Id;
                    status = true;
                }
                done = true;
            })
            require('deasync').loopWhile(function () {
                return !done;
            });
            if (status == true) {
                next();
            } else {
                res.status(200).send({status: false, msg: 'error', code: 702});
            }

        } else {
            res.status(200).send({status: false, msg: 'error', code: 702});
        }
    }
    // get auth header value

}
