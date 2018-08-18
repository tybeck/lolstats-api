'use strict';

import * as _ from 'lodash';

import { Environment } from '../interfaces/app.interface';

import { getEnvironmentalVariables } from './env.util';

import { VERSIONIFY_ENDPOINT } from '../constants/app.constant';
import { IDENTIFIERS } from '../constants/identifiers.constant';

import { LeagueService } from '../services/league.service';

import { container } from '../inversify.config';

let env: Environment = getEnvironmentalVariables();

function Versionify (): void {

    const league: LeagueService = container.get(IDENTIFIERS.LeagueService);

    _.forEach(VERSIONIFY_ENDPOINT, endpoint => {

        let value: string = env[endpoint];

        env[endpoint] = value.replace('{{version}}', league.getVersion);

    });

    console.log(env.SUMMONER_SPELLS_ENDPOINT);

}

export {

    Versionify

};