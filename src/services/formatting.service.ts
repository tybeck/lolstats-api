'use strict';

import * as _ from 'lodash';

import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';
import { GAME_MODES } from '../constants/lol.constant';

import { Server } from '../server';

import { LeagueService } from './league.service';

import {
    Environment,
    FormattedChampion,
    FormattedItem,
    FormattedMatch,
    FormattedRunesReforged,
    FormattedSummonerSpell,
    MatchResultPlayer
} from '../interfaces/app.interface';
import { Champion, Game, Item, Participant, ParticipantIdentity, RunesReforged, SummonerSpell } from '../interfaces/lol.interface';

import { getEnvironmentalVariables } from '../utils/env.util';

const env: Environment = getEnvironmentalVariables();

@injectable()
export class FormattingService {

    constructor (
        @inject(IDENTIFIERS.Server) private server: Server,
        @inject(IDENTIFIERS.LeagueService) private league: LeagueService
    ) {

        return this;

    }

    public formatPerk (rune: RunesReforged): FormattedRunesReforged {

        return {
            id: rune.id,
            path: `${env.STATIC_ASSET_IMAGE_BASE_PATH}img/${rune.icon}`,
            name: rune.name
        }

    }

    public formatSummonerSpell (spell: SummonerSpell): FormattedSummonerSpell {

        return {
            id: spell.id,
            name: spell.name,
            path: `${env.STATIC_ASSET_IMAGE_PATH}spell/${spell.image.full}`
        }

    }

    public formatChampion (champion: Champion): FormattedChampion {

        return {
            id: champion.id,
            key: champion.key,
            name: champion.name,
            path: `${env.STATIC_ASSET_IMAGE_PATH}champion/${champion.image.full}`
        }

    }

    public formatItems (items: Item[]): FormattedItem[] {

        let listItems: FormattedItem[] = [];

        _.forEach(items, item => {

            if (item) {

                listItems.push({
                    name: item.name,
                    path: `${env.STATIC_ASSET_IMAGE_PATH}item/${item.image.full}`,
                    desc: item.plaintext
                });

                return;

            }

            listItems.push(null);

        });

        return listItems;

    }

    /**
     * @method formatPlayers
     * @param match
     */

    public formatPlayers (match: Game, summonerName: string): MatchResultPlayer[] {

        let playerResults: MatchResultPlayer[] = [];

        _.forEach(match.participants, participant => {

            const id: number = participant.participantId,

                participantIdentity: ParticipantIdentity = <ParticipantIdentity>_.find(match.participantIdentities, { participantId: id }),

                champion: Champion = this.league.getChampion(participant.championId);

            let def: boolean = false;

            if (summonerName === participantIdentity.player.summonerName) {

                def = true;

            }

            playerResults.push({
                summonerName: participantIdentity.player.summonerName,
                champion: this.formatChampion(champion),
                team: participant.teamId,
                default: def
            });

        });

        return playerResults;

    }

    /**
     * @method _getCspm
     * Creep score per minute
     * @param participant
     * @param match
     * @private
     */

    private _getCspm (participant: Participant, match: Game): string {

        return ((participant.stats.totalMinionsKilled / match.gameDuration) * 60).toFixed(2);

    }

    /**
     * @method _getKda
     * @param participant
     * @private
     */

    private _getKda (participant: Participant): string {

        return ((participant.stats.assists + participant.stats.kills) / participant.stats.deaths).toFixed(2);

    }

    private _getStatForTeam (participant: Participant, match: Game, stat: string): number {
        return _.sum(_.map(match.participants, player => {
            if (player.teamId === participant.teamId) {
                return _.get(player, stat) || 0;
            }
            return 0;
        }));
    }

    /**
     * @method _getKillParticipation
     * @private
     */

    private _getKillParticipation (participant: Participant, match: Game): number {

        let totalTeamKills: number = this._getStatForTeam(participant, match, 'stats.kills'),

            kills: number = participant.stats.kills,

            assists: number = participant.stats.assists;

        return Math.round(((kills + assists) / totalTeamKills) * 100);

    }

    /**
     * @method formatMatch
     * Format the match data to fit a specific summoner view
     */

    public formatMatch (match: Game, name: string): FormattedMatch {

        const participantIdentity: ParticipantIdentity = <ParticipantIdentity>_.find(match.participantIdentities, { player: { summonerName: name } });

        if (participantIdentity) {

            const participant: Participant = <Participant>_.find(match.participants, { participantId: participantIdentity.participantId });

            if (participant) {

                const spell1: SummonerSpell = this.league.getSummonerSpell(participant.spell1Id),

                    spell2: SummonerSpell = this.league.getSummonerSpell(participant.spell2Id),

                    champion: Champion= this.league.getChampion(participant.championId),

                    items: Item[] = this.league.getItemsFromParticipant(participant),

                    players: MatchResultPlayer[] = this.formatPlayers(match, name),

                    perkPrimary: RunesReforged = this.league.getRuneReforged(participant.stats.perkPrimaryStyle),

                    perkSub: RunesReforged = this.league.getRuneReforged(participant.stats.perkSubStyle);

                return {
                    championLevel: participant.stats.champLevel,
                    gameId: match.gameId,
                    gameMode: GAME_MODES[match.gameMode],
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
                }

            }

        }

        return null;

    }

}