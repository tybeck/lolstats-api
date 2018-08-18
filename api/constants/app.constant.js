'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var env_util_1 = require("../utils/env.util");
var env = env_util_1.getEnvironmentalVariables();
exports.DEFAULT_PATHING = "/lol";
/**
 * @method VERSIONIFY_ENDPOINT
 * Endpoints that need league of legends current version
 */
exports.VERSIONIFY_ENDPOINT = [
    'CHAMPION_ENDPOINT',
    'ITEM_ENDPOINT',
    'RUNES_REFORGED_ENDPOINT',
    'SUMMONER_SPELLS_ENDPOINT',
    'STATIC_ASSET_IMAGE_PATH'
];
exports.qs = {
    api_key: env.LOL_API_KEY
};
//# sourceMappingURL=app.constant.js.map