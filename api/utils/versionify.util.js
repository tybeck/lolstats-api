'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var env_util_1 = require("./env.util");
var app_constant_1 = require("../constants/app.constant");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var inversify_config_1 = require("../inversify.config");
var env = env_util_1.getEnvironmentalVariables();
function Versionify() {
    var league = inversify_config_1.container.get(identifiers_constant_1.IDENTIFIERS.LeagueService);
    _.forEach(app_constant_1.VERSIONIFY_ENDPOINT, function (endpoint) {
        var value = env[endpoint];
        env[endpoint] = value.replace('{{version}}', league.getVersion);
    });
    console.log(env.SUMMONER_SPELLS_ENDPOINT);
}
exports.Versionify = Versionify;
//# sourceMappingURL=versionify.util.js.map