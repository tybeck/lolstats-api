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
var express = require("express");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var server_1 = require("../server");
var resolve_util_1 = require("../utils/resolve.util");
var app_constant_1 = require("../constants/app.constant");
var MatchRoutes = /** @class */ (function () {
    function MatchRoutes(server) {
        this.server = server;
        this.router = express.Router();
        this
            .router
            .route("/history/:summonerName")
            .get(resolve_util_1.resolve(identifiers_constant_1.IDENTIFIERS.MatchController, "getMatchHistory"));
        this
            .server
            .getHttpApp()
            .use(app_constant_1.DEFAULT_PATHING + "/match", this.router);
    }
    MatchRoutes = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __metadata("design:paramtypes", [server_1.Server])
    ], MatchRoutes);
    return MatchRoutes;
}());
exports.MatchRoutes = MatchRoutes;
//# sourceMappingURL=match.route.js.map