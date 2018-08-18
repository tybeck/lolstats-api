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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var rq = require("request-promise");
var _ = require("lodash");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var server_1 = require("../server");
var player_service_1 = require("./player.service");
var league_service_1 = require("./league.service");
var formatting_service_1 = require("./formatting.service");
var env_util_1 = require("../utils/env.util");
var app_constant_1 = require("../constants/app.constant");
var env = env_util_1.getEnvironmentalVariables();
var MatchService = /** @class */ (function () {
    function MatchService(server, league, formatting) {
        this.server = server;
        this.league = league;
        this.formatting = formatting;
        return this;
    }
    MatchService_1 = MatchService;
    MatchService.prototype.getPlayers = function (match) {
        var _this = this;
        var playerResults = [];
        _.forEach(match.participants, function (participant) {
            var id = participant.participantId, participantIdentity = _.find(match.participantIdentities, { participantId: id }), champion = _this.league.getChampion(participant.championId);
            playerResults.push({
                summonerName: participantIdentity.player.summonerName,
                champion: _this.formatting.formatChampion(champion),
                team: participant.teamId
            });
        });
        return playerResults;
    };
    /**
     * @method getMatch
     * @param gameId
     */
    MatchService.getMatch = function (game) {
        return __awaiter(this, void 0, Bluebird, function () {
            var gameId;
            return __generator(this, function (_a) {
                gameId = game;
                if (_.isObject(game)) {
                    gameId = game.gameId;
                }
                if (gameId) {
                    return [2 /*return*/, rq({
                            uri: "" + env.API_ENDPOINT + env.API_MATCH_ENDPOINT + gameId,
                            qs: app_constant_1.qs
                        })
                            .then(function (data) {
                            return JSON.parse(data);
                        })];
                }
                return [2 /*return*/, Bluebird.reject('Missing `gameId` necessary for retrieval of match!')];
            });
        });
    };
    /**
     * @method getMatchHistory
     * @param name
     */
    MatchService.prototype.getMatchHistory = function (name) {
        return __awaiter(this, void 0, Bluebird, function () {
            var matches, player, matchList, matchListItems, index, _a, _b, _c, _d, err_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!name.length) return [3 /*break*/, 10];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, , 9]);
                        matches = [];
                        return [4 /*yield*/, player_service_1.PlayerService.getPlayer(name)];
                    case 2:
                        player = _e.sent();
                        return [4 /*yield*/, MatchService_1.getMatchList(player)];
                    case 3:
                        matchList = _e.sent();
                        matchListItems = matchList.matches;
                        index = 0;
                        _e.label = 4;
                    case 4:
                        if (!(index < matchListItems.length)) return [3 /*break*/, 7];
                        _b = (_a = matches).push;
                        _d = (_c = this.formatting).formatMatch;
                        return [4 /*yield*/, MatchService_1.getMatch(matchListItems[index])];
                    case 5:
                        _b.apply(_a, [_d.apply(_c, [_e.sent(), name])]);
                        _e.label = 6;
                    case 6:
                        ++index;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, matches];
                    case 8:
                        err_1 = _e.sent();
                        return [2 /*return*/, Bluebird.reject(err_1)];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, Bluebird.reject("No summoner name given!")];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method getMatchList
     * @param player
     */
    MatchService.getMatchList = function (player) {
        if (player && player.accountId) {
            return rq({
                uri: "" + env.API_ENDPOINT + env.API_MATCHLIST_ENDPOINT + player.accountId,
                qs: _.extend(app_constant_1.qs, {
                    endIndex: MatchService_1.MATCH_RETURN_COUNT
                })
            })
                .then(function (data) {
                return JSON.parse(data);
            });
        }
        return Bluebird.reject('Missing `accountId` necessary for retrieval of match list!');
    };
    var MatchService_1;
    MatchService.MATCH_RETURN_COUNT = 6;
    MatchService = MatchService_1 = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __param(1, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.LeagueService)),
        __param(2, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.FormattingService)),
        __metadata("design:paramtypes", [server_1.Server,
            league_service_1.LeagueService,
            formatting_service_1.FormattingService])
    ], MatchService);
    return MatchService;
}());
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map