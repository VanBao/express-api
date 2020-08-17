global.config = require('./config');

global.checkPermission = require('./permission');

global.db = require('./db');

global.request = require('../helpers/requets');

global.helper_functions = require('../helpers/helper_functions');

global.checkLoginMiddleware = require('../middlewares/check_login');

global.verifyTokenMiddleware = require('../middlewares/verify_token');

global.paging = require('../helpers/knex_pagination');

global.mail = require("../helpers/mail");
