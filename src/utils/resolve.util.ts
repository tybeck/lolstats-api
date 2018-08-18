'use strict';

import * as express from 'express';
import * as _ from 'lodash';

import { container } from '../inversify.config';

import { IDENTIFIERS } from '../constants/identifiers.constant';

const UNKNOWN_METHOD: string = 'Method not found';

export function resolve<T> (
  type: symbol,
  method: string
): express.RequestHandler {

  return ((
    req: express.Request,
    res: express.Response,
    next: Function
  ): void => {

    let instance = container.get<T>(type),

      fn = instance[method];

    if (typeof fn !== 'undefined') {

      let args = [];

      if (fn && fn.interfaceList) {

        fn
          .interfaceList
          .forEach((_interface: (symbol|Function)): void => {

            if (typeof _interface === 'function') {

              args.push(_interface.apply({

                'request': req,

                'response': res

              }));

            } else {

              try {

                let inst = container.get(_interface);

                if ((<any>inst.constructor).populate) {

                  _.extend(inst, req.body);

                  args.push(inst);

                }

              } catch (e) {

                switch (_interface) {

                  case IDENTIFIERS.Response:

                    args.push(res);

                    break;

                  case IDENTIFIERS.Request:

                    args.push(req);

                    break;

                  case IDENTIFIERS.Next:

                    args.push(next);

                    break;

                }

              }
            }

          });

      }

      fn.apply(instance, args);

    } else {

      throw new Error(UNKNOWN_METHOD);

    }

  });

}