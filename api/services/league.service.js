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
var Bluebird = require("bluebird");
var rq = require("request-promise");
var _ = require("lodash");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var server_1 = require("../server");
var env_util_1 = require("../utils/env.util");
var log_util_1 = require("../utils/log.util");
var env = env_util_1.getEnvironmentalVariables();
var LeagueService = /** @class */ (function () {
    function LeagueService(server) {
        var _this = this;
        this.server = server;
        this._runesReforged = null;
        this._summonerSpells = null;
        this._champions = null;
        this._items = null;
        this._versions = null;
        this._version = null;
        /**
         * @method loadVersion
         * load current league of legends version for static assets, etc
         */
        this.loadVersion = function () {
            return rq({
                uri: env.VERSION_ENDPOINT
            })
                .then(function (_versions) {
                var versions = JSON.parse(_versions), version = versions[0];
                log_util_1.Log("League of Legends - v" + version);
                _this._versions = versions;
                _this._version = version;
                return !!_this._version;
            });
        };
        /**
         * @method loadResources
         * Load all league of legends static resources for querying purposes
         */
        this.loadResources = function () {
            return Bluebird.all([
                _this._loadRunesReforged(),
                _this._loadSummonerSpells(),
                _this._loadChampions(),
                _this._loadItems()
            ])
                .then(function (results) {
                console.log('resultss!!!', results);
                return Bluebird.resolve(true);
            });
        };
        return this;
    }
    /**
     * @method _loadRunesReforged
     * @private
     */
    LeagueService.prototype._loadRunesReforged = function () {
        var _this = this;
        return rq({
            uri: env.RUNES_REFORGED_ENDPOINT
        })
            .then(function (_runesReforged) {
            var runesReforged = JSON.parse(_runesReforged);
            if (runesReforged) {
                _this._runesReforged = runesReforged;
            }
            return !!_this._runesReforged;
        });
    };
    /**
     * @method _loadSummonerSpells
     * @private
     */
    LeagueService.prototype._loadSummonerSpells = function () {
        var _this = this;
        return rq({
            uri: env.SUMMONER_SPELLS_ENDPOINT
        })
            .then(function (_summoners) {
            var summoners = JSON.parse(_summoners);
            if (summoners.data) {
                _this._summonerSpells = summoners.data;
            }
            return !!_this._summonerSpells;
        });
    };
    /**
     * @method _loadChampions
     * @private
     */
    LeagueService.prototype._loadChampions = function () {
        var _this = this;
        return rq({
            uri: env.CHAMPION_ENDPOINT
        })
            .then(function (_champions) {
            var champions = JSON.parse(_champions);
            if (champions.data) {
                _this._champions = champions.data;
            }
            return !!_this._champions;
        });
    };
    /**
     * @method _loadItems
     * @private
     */
    LeagueService.prototype._loadItems = function () {
        var _this = this;
        return rq({
            uri: env.ITEM_ENDPOINT
        })
            .then(function (_champions) {
            var items = JSON.parse(_champions);
            if (items.data) {
                _this._items = items.data;
            }
            return !!_this._items;
        });
    };
    /**
     * @method getChampion
     * @param key
     */
    LeagueService.prototype.getChampion = function (key) {
        if (typeof key === 'number') {
            key = key.toString();
        }
        return _.find(this.getChampions, { key: key }) || null;
    };
    /**
     * @method getSummonerSpell
     * @param key
     */
    LeagueService.prototype.getSummonerSpell = function (key) {
        if (typeof key === 'number') {
            key = key.toString();
        }
        return _.find(this.getSummonerSpells, { key: key }) || null;
    };
    /**
     * @method getItem
     * @param key
     */
    LeagueService.prototype.getItem = function (key) {
        if (typeof key === 'number') {
            key = key.toString();
        }
        return this.getItems[key] || null;
    };
    /**
     * @method getRuneReforged
     * @param id
     */
    LeagueService.prototype.getRuneReforged = function (id) {
        return _.find(this.getRunesReforged, { id: id });
    };
    /**
     * @method getItemsFromParticipant
     * @param participant
     */
    LeagueService.prototype.getItemsFromParticipant = function (participant) {
        return [
            this.getItem(participant.stats.item0),
            this.getItem(participant.stats.item1),
            this.getItem(participant.stats.item2),
            this.getItem(participant.stats.item3),
            this.getItem(participant.stats.item4),
            this.getItem(participant.stats.item5),
            this.getItem(participant.stats.item6)
        ];
    };
    Object.defineProperty(LeagueService.prototype, "getRunesReforged", {
        /**
         * @method getRunesReforged
         */
        get: function () {
            return this._runesReforged;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueService.prototype, "getItems", {
        /**
         * @method getItems
         */
        get: function () {
            return this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueService.prototype, "getChampions", {
        /**
         * @method getChampions
         */
        get: function () {
            return this._champions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueService.prototype, "getSummonerSpells", {
        /**
         * @method getSummonerSpells
         */
        get: function () {
            return this._summonerSpells;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueService.prototype, "getVersion", {
        /**
         * @method getVersion
         * League of Legend current version
         */
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeagueService.prototype, "getVersions", {
        /**
         * @method getVersions
         * League of Legend list of versions
         */
        get: function () {
            return this._versions;
        },
        enumerable: true,
        configurable: true
    });
    LeagueService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __metadata("design:paramtypes", [server_1.Server])
    ], LeagueService);
    return LeagueService;
}());
exports.LeagueService = LeagueService;
//# sourceMappingURL=league.service.js.map