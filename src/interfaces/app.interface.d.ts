import * as q from 'q';
import {RunesReforged} from './lol.interface';

export interface IApp {}

export interface ILaunch {
  start (): q.Promise<boolean>|void;
}

export interface Environment {
  LOL_API_KEY: string;
  API_ENDPOINT: string;
  API_SUMMONER_ENDPOINT: string;
  API_MATCHLIST_ENDPOINT: string;
  API_MATCH_ENDPOINT: string;
  VERSION_ENDPOINT: string;
  CHAMPION_ENDPOINT: string;
  ITEM_ENDPOINT: string;
  RUNES_REFORGED_ENDPOINT: string;
  SUMMONER_SPELLS_ENDPOINT: string;
  STATIC_ASSET_IMAGE_PATH: string;
  STATIC_ASSET_IMAGE_BASE_PATH: string;
}

export interface FormattedMatch {
  gameId: number;
  gameMode: string;
  gameDuration: number;
  gameCreation: number;
  gameResult: boolean;
  championLevel: number;
  spell1: FormattedSummonerSpell;
  spell2: FormattedSummonerSpell;
  champion: FormattedChampion;
  cs: number;
  cspm: string;
  kills: number;
  deaths: number;
  assists: number;
  kda: string;
  items: FormattedItem[];
  players: MatchResultPlayer[];
  primaryPerk: FormattedRunesReforged;
  subPerk: FormattedRunesReforged;
  killParticipation: number;
}

export interface FormattedSummonerSpell {
  id: string;
  name: string;
  path: string;
}

export interface FormattedChampion {
  id: string;
  key: string;
  name: string;
  path: string;
}

export interface FormattedItem {
  name: string;
  desc: string;
  path: string;
}

export interface FormattedRunesReforged {
  id: number;
  name: string;
  path: string;
}

export interface MatchResultPlayer {
  summonerName: string;
  champion: FormattedChampion;
  default: boolean;
  team: number;
}