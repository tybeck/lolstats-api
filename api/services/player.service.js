'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var rq = require("request-promise");
var Bluebird = require("bluebird");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var server_1 = require("../server");
var env_util_1 = require("../utils/env.util");
var app_constant_1 = require("../constants/app.constant");
var PlayerService = /** @class */ (function () {
    function PlayerService(server) {
        this.server = server;
        return this;
    }
    /**
     * @method getPlayer
     * @param name
     */
    PlayerService.getPlayer = function (name) {
        var env = env_util_1.getEnvironmentalVariables();
        if (name.length) {
            return rq({
                uri: "" + env.API_ENDPOINT + env.API_SUMMONER_ENDPOINT + name,
                qs: app_constant_1.qs
            })
                .then(function (data) {
                return JSON.parse(data);
            });
        }
        return Bluebird.reject('No summoner name given!');
    };
    PlayerService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __metadata("design:paramtypes", [server_1.Server])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=player.service.js.map