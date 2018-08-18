'use strict';

import * as express from 'express';

import { inject, injectable } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { Server } from '../server';

import { resolve } from '../utils/resolve.util';

import { DEFAULT_PATHING } from '../constants/app.constant';

@injectable()
export class MatchRoutes {

  private router: express.Router;

  constructor (
    @inject(IDENTIFIERS.Server) private server: Server
  ) {

    this.router = express.Router();

    this
      .router
      .route(`/history/:summonerName`)
      .get(resolve<any>(IDENTIFIERS.MatchController, `getMatchHistory`));

    this
      .server
      .getHttpApp()
      .use(`${DEFAULT_PATHING}/match`, this.router);

  }

}