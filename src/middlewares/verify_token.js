const jwt = require('jsonwebtoken');
module.exports = async function (req, res, next) {
    let mod = (req.method == 'POST' || req.method == 'PUT') ? (req.body.mod ? req.body.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '') : (req.query.mod ? req.query.mod.replace(/[^a-z0-9\_\-]/i, '').toLowerCase() : '');
    req.mod = mod;
    if(!req.mod.length){
        res.status(200).send({status: false, msg: 'error', code: 702});
    }else if (global.check_permission.check_ignore(mod) == true) {
        next();
    } else {
        const bearerHeader = req.headers['authorization'];
        if (typeof  bearerHeader !== 'undefined' && bearerHeader.indexOf(' ') !== -1) {
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer[1];
            try{
                let authData = await jwt.verify(bearerToken, config.keySystem.key);
                if (authData) {
                    req.uid = authData.dataMain.Id;
                    next();
                }else{
                    res.status(200).send({status: false, msg: 'error', code: 702, data: []});
                }
            }catch (e) {
                res.status(200).send({status: false, msg: 'error', code: 702, data: []});
            }
        } else {
            res.status(200).send({status: false, msg: 'error', code: 702});
        }
    }
    // get auth header value

}
