'use strict';

import * as q from 'q';
import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as io from 'socket.io';

import { json } from 'body-parser';
import { injectable } from 'inversify';

import { IServer } from './interfaces/server.interface';
import { ILaunch } from './interfaces/app.interface';

import { Log } from './utils/log.util';

const pkg = require('../package.json');

@injectable()
export class Server implements IServer, ILaunch {

  private httpApp: express.Application;

  private httpAppInstance: http.Server;

  private http: http.Server;

  public io: any;

  constructor () {

    this.httpApp = express();

    this.httpAppInstance = new http.Server(this.httpApp);

    this.io = io(this.httpAppInstance);

    return this;

  }

  public get cwd (): string {

    return __dirname;

  }

  public version (): Server {

    Log('Running Application v'.concat(pkg.version));

    return this;

  }

  /**
   * @method configure
   * @returns {Server}
   */

  public configure (): Server {

    Log('Configuring Application...');

    this.httpApp.use(cors());

    this.httpApp.use(json());

    return this;

  }

  /**
   * @method start
   * @returns {Q.Promise<boolean>}
   */

  public start (): q.Promise<boolean> {

    let deferred: q.Deferred<boolean> = q.defer<boolean>();

    this.http = this
      .httpAppInstance
      .listen(8080, () => {

          Log
            (`HTTP Express -> Listening on 8080...`)
            (`Using environment: local`);

          deferred.resolve(true);

      });

    return deferred.promise;

  }

  public getHttpApp (): express.Application {

    return this.httpApp;

  }

  public getHttpInstance (): http.Server {

    return this.http;

  }

}