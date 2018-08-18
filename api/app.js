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
var async = require("async");
require("./inversify.config");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("./constants/identifiers.constant");
var league_service_1 = require("./services/league.service");
var server_1 = require("./server");
var versionify_util_1 = require("./utils/versionify.util");
var log_util_1 = require("./utils/log.util");
var routes_1 = require("./routes/");
var App = /** @class */ (function () {
    function App(server, routes, league) {
        this.server = server;
        this.routes = routes;
        this.league = league;
        this.launch();
        return this;
    }
    /**
     * @method launch
     * Launch application process
     */
    App.prototype.launch = function () {
        var launchers = [
            this.server.configure.bind(this.server),
            this.league.loadVersion,
            versionify_util_1.Versionify,
            this.league.loadResources,
            this.routes,
            this.server
        ];
        async.eachSeries(launchers, function (launch, next) {
            if (launch instanceof Function) {
                var l = launch();
                if (l && l.then) {
                    return l.then(function () {
                        return next();
                    });
                }
                next();
            }
            else {
                var l = launch, p = l.start();
                if (p) {
                    p
                        .then(function () {
                        next();
                    });
                }
                else {
                    next();
                }
            }
        }, function () {
            log_util_1.Log('Application successfully started!');
        });
    };
    App = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __param(1, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Routes)),
        __param(2, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.LeagueService)),
        __metadata("design:paramtypes", [server_1.Server,
            routes_1.Routes,
            league_service_1.LeagueService])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map