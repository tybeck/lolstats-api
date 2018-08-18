'use strict';

import { Container } from 'inversify';

import { IDENTIFIERS } from './constants/identifiers.constant';

import { IApp } from './interfaces/app.interface';
import { App } from './app';

import { IServer } from './interfaces/server.interface';
import { Server } from './server';

import { Routes } from './routes/';

import { MatchController } from './controllers/match.controller';

import { MatchService } from './services/match.service';
import { PlayerService } from './services/player.service';
import { LeagueService } from './services/league.service';
import { FormattingService } from './services/formatting.service';

import { MatchRoutes } from './routes/match.route';

let container: Container = new Container();

// core

container.bind<IApp>(IDENTIFIERS.App).to(App);
container.bind<IServer>(IDENTIFIERS.Server).to(Server).inSingletonScope();

// middlewares

// services

container.bind<any>(IDENTIFIERS.FormattingService).to(FormattingService).inSingletonScope();
container.bind<any>(IDENTIFIERS.LeagueService).to(LeagueService).inSingletonScope();
container.bind<any>(IDENTIFIERS.MatchService).to(MatchService).inSingletonScope();
container.bind<any>(IDENTIFIERS.PlayerService).to(PlayerService).inSingletonScope();

// controllers

container.bind<any>(IDENTIFIERS.MatchController).to(MatchController).inSingletonScope();

// routes

container.bind<any>(IDENTIFIERS.Routes).to(Routes).inSingletonScope();
container.bind<any>(IDENTIFIERS.MatchRoutes).to(MatchRoutes).inSingletonScope();

export {

  container

};