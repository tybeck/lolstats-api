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
Object.defineProperty(exports, "__esModule", { value: true });
var q = require("q");
var http = require("http");
var express = require("express");
var cors = require("cors");
var io = require("socket.io");
var body_parser_1 = require("body-parser");
var inversify_1 = require("inversify");
var log_util_1 = require("./utils/log.util");
var pkg = require('../package.json');
var Server = /** @class */ (function () {
    function Server() {
        this.httpApp = express();
        this.httpAppInstance = new http.Server(this.httpApp);
        this.io = io(this.httpAppInstance);
        return this;
    }
    Object.defineProperty(Server.prototype, "cwd", {
        get: function () {
            return __dirname;
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.version = function () {
        log_util_1.Log('Running Application v'.concat(pkg.version));
        return this;
    };
    /**
     * @method configure
     * @returns {Server}
     */
    Server.prototype.configure = function () {
        log_util_1.Log('Configuring Application...');
        this.httpApp.use(cors());
        this.httpApp.use(body_parser_1.json());
        return this;
    };
    /**
     * @method start
     * @returns {Q.Promise<boolean>}
     */
    Server.prototype.start = function () {
        var deferred = q.defer();
        this.http = this
            .httpAppInstance
            .listen(8080, function () {
            log_util_1.Log("HTTP Express -> Listening on 8080...")("Using environment: local");
            deferred.resolve(true);
        });
        return deferred.promise;
    };
    Server.prototype.getHttpApp = function () {
        return this.httpApp;
    };
    Server.prototype.getHttpInstance = function () {
        return this.http;
    };
    Server = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [])
    ], Server);
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map