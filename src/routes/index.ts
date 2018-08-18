'use strict';

import { injectable } from 'inversify';

import * as q from 'q';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { container } from '../inversify.config';

import { Log } from '../utils/log.util';

@injectable()
export class Routes {
  
  constructor () {

    return this;

  }

  public start (): q.Promise<boolean> {

    let deferred: q.Deferred<boolean> = q.defer<boolean>(),
      
      routes: symbol[] = [
        IDENTIFIERS.MatchRoutes
      ];
    
    routes.forEach((route: symbol): void => {
      
      container.get(route);
      
    });

    Log(`Routes applied!`);

    deferred.resolve(true);

    return deferred.promise;

  }
  
}