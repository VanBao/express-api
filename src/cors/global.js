global.config = require('./config');

global.check_permission = require('./permission');

global.db = require('./db');

global.request = require('../helpers/requets');

global.helper_functions = require('../helpers/helper_functions');

global.check_login_middleware = require('../middlewares/check_login');

global.verify_token_middleware = require('../middlewares/verify_token');

global.paging = require('../helpers/knex_pagination');

global.mail = require("../helpers/mail");
