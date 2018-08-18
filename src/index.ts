/**
 * lolstats - API
 * @version 0.0.1
 * @author Tyler Beck
 */

'use strict';

require('dotenv').config();

import 'reflect-metadata';

import { container } from './inversify.config';

import { IDENTIFIERS } from './constants/identifiers.constant';

import { IApp } from './interfaces/app.interface';

import { Log } from './utils/log.util';

Log
  ('API')
  ('Bootstrapping Application...');

container.get<IApp>(IDENTIFIERS.App);