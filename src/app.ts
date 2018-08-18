'use strict';

import * as async from 'async';
import * as q from 'q';

import './inversify.config';

import { inject, injectable } from 'inversify';

import { IApp, ILaunch } from './interfaces/app.interface';

import { IDENTIFIERS } from './constants/identifiers.constant';

import { LeagueService } from './services/league.service';

import { Server } from './server';

import { Versionify } from './utils/versionify.util';
import { Log } from './utils/log.util';

import { Routes } from './routes/';

@injectable()
export class App implements IApp {

  constructor (
    @inject(IDENTIFIERS.Server) private server: Server,
    @inject(IDENTIFIERS.Routes) private routes: Routes,
    @inject(IDENTIFIERS.LeagueService) private league: LeagueService
  ) {

    this.launch();

    return this;

  }

    /**
     * @method launch
     * Launch application process
     */

  private launch (): void {

    let launchers: (ILaunch|Function)[] = [
      this.server.configure.bind(this.server),
      this.league.loadVersion,
      Versionify,
      this.league.loadResources,
      this.routes,
      this.server
    ];

    async.eachSeries(launchers, (
      launch: (ILaunch|Function),
      next: Function
    ): void => {

      if (launch instanceof Function) {

        const l = launch();

        if (l && l.then) {

          return l.then(() => {

            return next();

          });

        }

        next();

      } else {

        let l = (launch as ILaunch),

          p = l.start();

        if (p) {

          (<q.Promise<boolean>>p)
            .then((): void => {

              next();

            });

        } else {

          next();

        }

      }

    }, () => {

      Log('Application successfully started!');

    });

  }

}