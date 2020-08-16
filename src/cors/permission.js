const arrRoutes = {
};
let ignore = [
    "login", "register"
];


exports.check_function = function (method, controller, fun, role) {
    if (arrRoutes[method.toLowerCase()][controller] && arrRoutes[method.toLowerCase()][controller][fun]) {
        if (arrRoutes[method.toLowerCase()][controller][fun] === 'all') {
            return true;
        } else {
            if (arrRoutes[method.toLowerCase()][controller][fun].indexOf(role) !== -1) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
};
exports.check_ignore = function (fun) {
    // console.log(ignore.indexOf(fun))
    if (ignore.indexOf(fun) !== -1) {
        return true;
    } else {
        return false;
    }
};
