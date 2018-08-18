'use strict';

import * as rq from 'request-promise';
import * as Bluebird from 'bluebird';

import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { Server } from '../server';

import { Environment } from '../interfaces/app.interface';
import { Player } from '../interfaces/lol.interface';

import { getEnvironmentalVariables } from '../utils/env.util';

import { qs } from '../constants/app.constant';

@injectable()
export class PlayerService {

    constructor (
        @inject(IDENTIFIERS.Server) private server: Server
    ) {

        return this;

    }

    /**
     * @method getPlayer
     * @param name
     */

    public static getPlayer (name: string): Bluebird<Player> {

        const env: Environment = getEnvironmentalVariables();

        if (name.length) {

            return rq({
                uri: `${env.API_ENDPOINT}${env.API_SUMMONER_ENDPOINT}${name}`,
                qs
            })
                .then(data => {

                    return JSON.parse(data);

                });

        }

        return Bluebird.reject('No summoner name given!');

    }

}