'use strict';

import * as Bluebird from 'bluebird';
import * as rq from 'request-promise';
import * as _ from 'lodash';

import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { Server } from '../server';

import { Environment } from '../interfaces/app.interface';
import { Champion, Champions, Items, Item, SummonerSpell, SummonerSpells, Participant, RunesReforged } from '../interfaces/lol.interface';

import { getEnvironmentalVariables } from '../utils/env.util';

import { Log } from '../utils/log.util';

const env: Environment = getEnvironmentalVariables();

@injectable()
export class LeagueService {

    private _runesReforged: RunesReforged[] = null;

    private _summonerSpells: SummonerSpell[] = null;

    private _champions: Champion[] = null;

    private _items: Item[] = null;

    private _versions: string = null;

    private _version: string = null;

    constructor (
        @inject(IDENTIFIERS.Server) private server: Server
    ) {

        return this;

    }

    /**
     * @method loadVersion
     * load current league of legends version for static assets, etc
     */

    public loadVersion = (): Bluebird<boolean> => {

        return rq({
            uri: env.VERSION_ENDPOINT
        })
            .then(_versions => {

                const versions = JSON.parse(_versions),

                    version = versions[0];

                Log(`League of Legends - v${version}`);

                this._versions = versions;

                this._version = version;

                return !!this._version;

            });

    };

    /**
     * @method loadResources
     * Load all league of legends static resources for querying purposes
     */

    public loadResources = (): Bluebird<boolean> => {

        return Bluebird.all([
            this._loadRunesReforged(),
            this._loadSummonerSpells(),
            this._loadChampions(),
            this._loadItems()
        ])
            .then(results => {

                return Bluebird.resolve(true);

            });

    };

    /**
     * @method _loadRunesReforged
     * @private
     */

    private _loadRunesReforged (): Bluebird<boolean> {

        return rq({
            uri: env.RUNES_REFORGED_ENDPOINT
        })
            .then(_runesReforged => {

                const runesReforged: RunesReforged[] = JSON.parse(_runesReforged);

                if (runesReforged) {

                    this._runesReforged = runesReforged;

                }

                return !!this._runesReforged;

            });

    }

    /**
     * @method _loadSummonerSpells
     * @private
     */

    private _loadSummonerSpells (): Bluebird<boolean> {

        return rq({
            uri: env.SUMMONER_SPELLS_ENDPOINT
        })
            .then(_summoners => {

                const summoners: SummonerSpells = JSON.parse(_summoners);

                if (summoners.data) {

                    this._summonerSpells = summoners.data;

                }

                return !!this._summonerSpells;

            });

    }

    /**
     * @method _loadChampions
     * @private
     */

    private _loadChampions (): Bluebird<boolean> {

        return rq({
            uri: env.CHAMPION_ENDPOINT
        })
            .then(_champions => {

                const champions: Champions = JSON.parse(_champions);

                if (champions.data) {

                    this._champions = champions.data;

                }

                return !!this._champions;

            });

    }

    /**
     * @method _loadItems
     * @private
     */

    private _loadItems (): Bluebird<boolean> {

        return rq({
            uri: env.ITEM_ENDPOINT
        })
            .then(_champions => {

                const items: Items = JSON.parse(_champions);

                if (items.data) {

                    this._items = items.data;

                }

                return !!this._items;

            });

    }

    /**
     * @method getChampion
     * @param key
     */

    public getChampion (key: string|number): Champion {

        if (typeof key === 'number') {

            key = key.toString();

        }

        return <Champion>_.find(this.getChampions, { key }) || null;

    }

    /**
     * @method getSummonerSpell
     * @param key
     */

    public getSummonerSpell (key: string|number): SummonerSpell {

        if (typeof key === 'number') {

            key = key.toString();

        }

        return <SummonerSpell>_.find(this.getSummonerSpells, { key }) || null;

    }

    /**
     * @method getItem
     * @param key
     */

    public getItem (key: string|number): Item {

        if (typeof key === 'number') {

            key = key.toString();

        }

        return <Item>this.getItems[key] || null;

    }

    /**
     * @method getRuneReforged
     * @param id
     */

    public getRuneReforged (id: number): RunesReforged {

        return <RunesReforged>_.find(this.getRunesReforged, { id: id });

    }

    /**
     * @method getItemsFromParticipant
     * @param participant
     */

    public getItemsFromParticipant (participant: Participant): Item[] {

        return [
            this.getItem(participant.stats.item0),
            this.getItem(participant.stats.item1),
            this.getItem(participant.stats.item2),
            this.getItem(participant.stats.item3),
            this.getItem(participant.stats.item4),
            this.getItem(participant.stats.item5),
            this.getItem(participant.stats.item6)
        ];

    }



    /**
     * @method getRunesReforged
     */

    public get getRunesReforged (): RunesReforged[] {

        return this._runesReforged;

    }

    /**
     * @method getItems
     */

    public get getItems (): Item[] {

        return this._items;

    }

    /**
     * @method getChampions
     */

    public get getChampions (): Champion[] {

        return this._champions;

    }

    /**
     * @method getSummonerSpells
     */

    public get getSummonerSpells (): SummonerSpell[] {

        return this._summonerSpells;

    }

    /**
     * @method getVersion
     * League of Legend current version
     */

    public get getVersion (): string {

        return this._version;

    }

    /**
     * @method getVersions
     * League of Legend list of versions
     */

    public get getVersions (): string {

        return this._versions;

    }

}