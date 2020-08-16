/**
 * @author Hai <thanhaideveloper@gmail.com>
 * @target config param global
 */

global.config = require('./config');

global.checkPermission = require('./permission');

global.db = require('../db/knex');

global.request = require('../helpers/requets');

global.ultility = require('../helpers/ultility');

global.checkLoginMiddleware = require('../middlewares/checkLogin');

global.verifyTokenMiddleware = require('../middlewares/verifyToken');

global.paging = require('../helpers/knex-pagination');

global.mail = require("../helpers/mail");
