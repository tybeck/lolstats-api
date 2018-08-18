'use strict';

import * as Bluebird from 'bluebird';
import * as rq from 'request-promise';
import * as _ from 'lodash';

import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { Server } from '../server';

import { PlayerService } from './player.service';
import { LeagueService } from './league.service';
import { FormattingService } from './formatting.service';

import { Champion, Game, MatchList, MatchListItem, ParticipantIdentity, Player } from '../interfaces/lol.interface';
import { Environment, FormattedMatch, MatchResultPlayer } from '../interfaces/app.interface';

import { getEnvironmentalVariables } from '../utils/env.util';

import { qs } from '../constants/app.constant';

const env: Environment = getEnvironmentalVariables();

@injectable()
export class MatchService {

  private static MATCH_RETURN_COUNT: number = 6;

  constructor (
    @inject(IDENTIFIERS.Server) private server: Server,
    @inject(IDENTIFIERS.LeagueService) private league: LeagueService,
    @inject(IDENTIFIERS.FormattingService) private formatting: FormattingService
  ) {
    
    return this;
    
  }

  /**
   * @method getMatch
   * @param gameId
   */

  public static async getMatch (game: number|MatchListItem): Bluebird<Game> {

    let gameId = game;

    if (_.isObject(game)) {

      gameId = (<MatchListItem>game).gameId;

    }

    if (gameId) {

      return rq({
          uri: `${env.API_ENDPOINT}${env.API_MATCH_ENDPOINT}${gameId}`,
          qs
      })
        .then(data => {

          return (JSON.parse(data) as Game);

        });


    }

    return Bluebird.reject('Missing `gameId` necessary for retrieval of match!');

  }

  /**
   * @method getMatchHistory
   * @param name
   */

  public async getMatchHistory (name: string): Bluebird<any> {

    if (name.length) {

      try {

        let matches: FormattedMatch[] = [];

        const player: Player = await PlayerService.getPlayer(name);

        const matchList: MatchList = await MatchService.getMatchList(player);

        const matchListItems: MatchListItem[] = matchList.matches;

        for (let index = 0; index < matchListItems.length; ++index) {

          matches.push(this.formatting.formatMatch(await MatchService.getMatch(matchListItems[index]), name));

        }

        return matches;

      } catch (err) {

        return Bluebird.reject(err);

      }

    } else {

      return Bluebird.reject(`No summoner name given!`);

    }

  }

  /**
   * @method getMatchList
   * @param player
   */

  private static getMatchList (player: Player): Bluebird<MatchList> {

    if (player && player.accountId) {

    return rq({
      uri: `${env.API_ENDPOINT}${env.API_MATCHLIST_ENDPOINT}${player.accountId}`,
      qs: _.extend(qs, {
          endIndex: MatchService.MATCH_RETURN_COUNT
      })
    })
      .then(data => {

        return JSON.parse(data);

      });

    }

    return Bluebird.reject('Missing `accountId` necessary for retrieval of match list!');

  }

}