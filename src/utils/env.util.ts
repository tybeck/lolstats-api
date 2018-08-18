'use strict';

import { Environment } from '../interfaces/app.interface';

function getEnvironmentalVariables (): Environment {

    return (process.env as any);

}

export {

    getEnvironmentalVariables

};