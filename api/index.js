/**
 * lolstats - API
 * @version 0.0.1
 * @author Tyler Beck
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var mongoose = require("mongoose");
var q = require("q");
require("reflect-metadata");
var inversify_config_1 = require("./inversify.config");
var identifiers_constant_1 = require("./constants/identifiers.constant");
var log_util_1 = require("./utils/log.util");
mongoose.Promise = q.Promise;
log_util_1.Log('API')('Bootstrapping Application...');
inversify_config_1.container.get(identifiers_constant_1.IDENTIFIERS.App);
//# sourceMappingURL=index.js.map