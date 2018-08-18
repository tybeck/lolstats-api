'use strict';

import { Environment } from '../interfaces/app.interface';

import { getEnvironmentalVariables } from '../utils/env.util';

const env: Environment = getEnvironmentalVariables();

export const DEFAULT_PATHING: string = `/lol`;

/**
 * @method VERSIONIFY_ENDPOINT
 * Endpoints that need league of legends current version
 */

export const VERSIONIFY_ENDPOINT: string[] = [
    'CHAMPION_ENDPOINT',
    'ITEM_ENDPOINT',
    'RUNES_REFORGED_ENDPOINT',
    'SUMMONER_SPELLS_ENDPOINT',
    'STATIC_ASSET_IMAGE_PATH'
];

export const qs = {
    api_key: env.LOL_API_KEY
};