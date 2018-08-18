'use strict';

import * as express from 'express';

import { injectable, inject } from 'inversify';

import { IDENTIFIERS } from '../constants/identifiers.constant';

import { MatchService } from '../services/match.service';

import { interfaces } from '../decorators/interfaces.decorator';

@injectable()
export class MatchController {

  constructor (
      @inject(IDENTIFIERS.MatchService) public matchService: MatchService
  ) {

    return this;

  }

  @interfaces([
    IDENTIFIERS.Request,
    IDENTIFIERS.Response,
    IDENTIFIERS.Next
  ])
  public async getMatchHistory (
    req: express.Request,
    res: express.Response,
    next: Function
  ) {

    const {summonerName} = req.params;

    try {

      res
          .status(200)
          .json(await this.matchService.getMatchHistory(summonerName || ''));

    } catch (err) {

      res
        .status(400)
        .json({

            error: err

        });

      return next();

    }

  }

}