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
var _ = require("lodash");
var inversify_1 = require("inversify");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var lol_constant_1 = require("../constants/lol.constant");
var server_1 = require("../server");
var league_service_1 = require("./league.service");
var env_util_1 = require("../utils/env.util");
var inversify_config_1 = require("../inversify.config");
var env = env_util_1.getEnvironmentalVariables();
var FormattingService = /** @class */ (function () {
    function FormattingService(server, league) {
        this.server = server;
        this.league = league;
        return this;
    }
    FormattingService.prototype.formatPerk = function (rune) {
        return {
            id: rune.id,
            path: env.STATIC_ASSET_IMAGE_BASE_PATH + "img/" + rune.icon,
            name: rune.name
        };
    };
    FormattingService.prototype.formatSummonerSpell = function (spell) {
        return {
            id: spell.id,
            name: spell.name,
            path: env.STATIC_ASSET_IMAGE_PATH + "spell/" + spell.image.full
        };
    };
    FormattingService.prototype.formatChampion = function (champion) {
        return {
            id: champion.id,
            key: champion.key,
            name: champion.name,
            path: env.STATIC_ASSET_IMAGE_PATH + "champion/" + champion.image.full
        };
    };
    FormattingService.prototype.formatItems = function (items) {
        var listItems = [];
        _.forEach(items, function (item) {
            if (item) {
                listItems.push({
                    name: item.name,
                    path: env.STATIC_ASSET_IMAGE_PATH + "item/" + item.image.full,
                    desc: item.plaintext
                });
                return;
            }
            listItems.push(null);
        });
        return listItems;
    };
    /**
     * @method _getCspm
     * Creep score per minute
     * @param participant
     * @param match
     * @private
     */
    FormattingService.prototype._getCspm = function (participant, match) {
        return ((participant.stats.totalMinionsKilled / match.gameDuration) * 60).toFixed(2);
    };
    /**
     * @method _getKda
     * @param participant
     * @private
     */
    FormattingService.prototype._getKda = function (participant) {
        return ((participant.stats.assists + participant.stats.kills) / participant.stats.deaths).toFixed(2);
    };
    FormattingService.prototype._getStatForTeam = function (participant, match, stat) {
        return _.sum(_.map(match.participants, function (player) {
            if (player.teamId === participant.teamId) {
                return _.get(player, stat) || 0;
            }
            return 0;
        }));
    };
    /**
     * @method _getKillParticipation
     * @private
     */
    FormattingService.prototype._getKillParticipation = function (participant, match) {
        var totalTeamKills = this._getStatForTeam(participant, match, 'stats.kills'), kills = participant.stats.kills, assists = participant.stats.assists;
        return Math.round(((kills + assists) / totalTeamKills) * 100);
    };
    /**
     * @method formatMatch
     * Format the match data to fit a specific summoner view
     */
    FormattingService.prototype.formatMatch = function (match, name) {
        var matchService = inversify_config_1.container.get(identifiers_constant_1.IDENTIFIERS.MatchService);
        var participantIdentity = _.find(match.participantIdentities, { player: { summonerName: name } });
        if (participantIdentity) {
            var participant = _.find(match.participants, { participantId: participantIdentity.participantId });
            if (participant) {
                var spell1 = this.league.getSummonerSpell(participant.spell1Id), spell2 = this.league.getSummonerSpell(participant.spell2Id), champion = this.league.getChampion(participant.championId), items = this.league.getItemsFromParticipant(participant), players = matchService.getPlayers(match), perkPrimary = this.league.getRuneReforged(participant.stats.perkPrimaryStyle), perkSub = this.league.getRuneReforged(participant.stats.perkSubStyle);
                return {
                    championLevel: participant.stats.champLevel,
                    gameId: match.gameId,
                    gameMode: lol_constant_1.GAME_MODES[match.gameMode],
                    gameCreation: match.gameCreation,
                    gameDuration: match.gameDuration,
                    gameResult: participant.stats.win,
                    spell1: this.formatSummonerSpell(spell1),
                    spell2: this.formatSummonerSpell(spell2),
                    champion: this.formatChampion(champion),
                    cs: participant.stats.totalMinionsKilled,
                    cspm: this._getCspm(participant, match),
                    kills: participant.stats.kills,
                    deaths: participant.stats.deaths,
                    assists: participant.stats.assists,
                    kda: this._getKda(participant),
                    items: this.formatItems(items),
                    players: players,
                    primaryPerk: this.formatPerk(perkPrimary),
                    subPerk: this.formatPerk(perkSub),
                    killParticipation: this._getKillParticipation(participant, match)
                };
            }
        }
        return null;
    };
    FormattingService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.Server)),
        __param(1, inversify_1.inject(identifiers_constant_1.IDENTIFIERS.LeagueService)),
        __metadata("design:paramtypes", [server_1.Server,
            league_service_1.LeagueService])
    ], FormattingService);
    return FormattingService;
}());
exports.FormattingService = FormattingService;
//# sourceMappingURL=formatting.service.js.map