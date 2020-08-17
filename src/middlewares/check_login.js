module.exports = async function (req, res, next) {

    if (global.check_permission.check_ignore(req.mod) == true) {
        next();
    } else {
        // let user = await global.db("ep_users").select("*").where('ID', req.body.UID).first();
        // if (user && user['Active'] == true && user['Status'] == true) {
        //     req.body.userInfo = user;
        //     next();
        // } else {
        //     res.status(200).send({status: false, msg: 'fail', code: 704, data: []});
        // }
        next();
    }

}