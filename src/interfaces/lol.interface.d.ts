// These interfaces are directly related to data structures
// returned from league of legends api endpoints

export interface MatchListItem {
    platformId: string;
    gameId: number;
    champion: number;
    queue: number;
    season: number;
    timestamp: number;
    role: string;
    lane: string;
}

export interface MatchList {
    matches: MatchListItem[];
    startIndex: number;
    endIndex: number;
    totalGames: number;
}

export interface Player {
    id: number;
    accountId: number;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

/**
 * @interface Summoner
 * This interface has different data than player; even
 * though they're both related
 */

export interface Summoner {
    accountId: number;
    currentAccountId: number;
    currentPlatformId: string;
    matchHistoryUri: string;
    platformId: string;
    profileIcon: number;
    summonerId: number;
    summonerName: string;
}

export interface ParticipantIdentity {
    participantId: number;
    player: Summoner;
}

export interface Participant {
    championId: number;
    highestAchievedSeasonTier: string;
    participantId: number;
    spell1Id: number;
    spell2Id: number;
    teamId: number;
    stats: Stats;
    timeline: Timeline;
}

export interface Team {
    bans: any[];
    baronKills: number;
    dominionVictoryScore: number;
    dragonKills: number;
    firstBaron: boolean;
    firstBlood: boolean;
    firstDragon: boolean;
    firstInhibitor: boolean;
    firstRiftHerald: boolean;
    firstTower: boolean;
    inhibitorKills: number;
    riftHeraldKills: number;
    teamId: number;
    towerKills: number;
    vilemawKills: number;
    win: string;
}

export interface Timeline {
    creepsPerMinDeltas: TimelineDeltas;
    csDiffPerMinDeltas: TimelineDeltas;
    damageTakenDiffPerMinDeltas: TimelineDeltas;
    damageTakenPerMinDeltas: TimelineDeltas;
    goldPerMinDeltas: TimelineDeltas;
    lane: string;
    participantId: number;
    role: string;
    xpDiffPerMinDeltas: TimelineDeltas;
    xpPerMinDeltas: TimelineDeltas;
}

export interface TimelineDeltas {
    [key: string]: Object[];
}

export interface Stats {
    assists: number;
    champLevel: number;
    combatPlayerScore: number;
    damageDealtToObjectives: number;
    damageDealtToTurrets: number;
    damageSelfMitigated: number;
    deaths: number;
    doubleKills: number;
    firstBloodAssist: boolean;
    firstBloodKill: boolean;
    firstTowerAssist: boolean;
    firstTowerKill: boolean;
    goldEarned: number;
    goldSpent: number;
    inhibitorKills: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    killingSprees: number;
    kills: number;
    largestCriticalStrike: number;
    largestKillingSpree: number;
    largestMultiKill: number;
    longestTimeSpentLiving: number;
    magicDamageDealt: number;
    magicDamageDealtToChampions: number;
    magicalDamageTaken: number;
    neutralMinionsKilled: number;
    neutralMinionsKilledEnemyJungle: number;
    neutralMinionsKilledTeamJungle: number;
    objectivePlayerScore: number;
    participantId: number;
    pentaKills: number;
    perk0: number;
    perk0Var1: number;
    perk0Var2: number;
    perk0Var3: number;
    perk1: number;
    perk1Var1: number;
    perk1Var2: number;
    perk1Var3: number;
    perk2: number;
    perk2Var1: number;
    perk2Var2: number;
    perk2Var3: number;
    perk3: number;
    perk3Var1: number;
    perk3Var2: number;
    perk3Var3: number;
    perk4: number;
    perk4Var1: number;
    perk4Var2: number;
    perk4Var3: number;
    perk5: number;
    perk5Var1: number;
    perk5Var2: number;
    perk5Var3: number;
    perkPrimaryStyle: number;
    perkSubStyle: number;
    physicalDamageDealt: number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken: number;
    playerScore0: number;
    playerScore1: number;
    playerScore2: number;
    playerScore3: number;
    playerScore4: number;
    playerScore5: number;
    playerScore6: number;
    playerScore7: number;
    playerScore8: number;
    playerScore9: number;
    quadraKills: number;
    sightWardsBoughtInGame: number;
    timeCCingOthers: number;
    totalDamageDealt: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    totalHeal: number;
    totalMinionsKilled: number;
    totalPlayerScore: number;
    totalScoreRank: number;
    totalTimeCrowdControlDealt: number;
    totalUnitsHealed: number;
    tripleKills: number;
    trueDamageDealt: number;
    trueDamageDealtToChampions: number;
    trueDamageTaken: number;
    turretKills: number;
    unrealKills: number;
    visionScore: number;
    visionWardsBoughtInGame: number;
    wardsKilled: number;
    wardsPlaced: number;
    win: boolean;
}

export interface Game {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participantIdentities: ParticipantIdentity[];
    participants: Participant[];
    platformId: string;
    queueId: number;
    seasonId: number;
    teams: Team[];
}

export interface SummonerSpells {
    type: string;
    version: string;
    data: SummonerSpell[];
}

export interface SummonerSpell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: any;
    effect: any[];
    effectBurn: string[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: Image;
    resource: string;
}

export interface Image {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface Champions {
    type: string;
    format: string;
    version: string;
    data: Champion[];
}

export interface Champion {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    image: Image;
}

export interface Items {
    type: string;
    version: string;
    basic: any;
    data: Item[];
}

export interface Item {
    name: string;
    image: Image;
    plaintext: string;
}

export interface RunesReforged {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: any[];
}