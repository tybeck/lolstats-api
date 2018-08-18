'use strict';

let IDENTIFIERS = {

  // core

  App: Symbol('App'),

  Server: Symbol('Server'),

  Routes: Symbol('Routes'),

  // services

  FormattingService: Symbol('FormattingService'),

  MatchService: Symbol('MatchService'),

  PlayerService: Symbol('PlayerService'),

  LeagueService: Symbol('LeagueService'),

  // controllers

  MatchController: Symbol('MatchController'),

  // routes

  MatchRoutes: Symbol('MatchRoutes'),

  // middlewares

  // special

  Request: Symbol('Request'),

  Response: Symbol('Response'),

  Next: Symbol('Next')

};

export {

  IDENTIFIERS

};