'use strict';

/**
 * @mehod interfaces
 * Used to decorate a method with commonly-used identifiers
 * @param list
 */

export function interfaces (list: (symbol|Function)[]): any {

  return (target: any, method: string) => {

    if (typeof method !== 'undefined') {

      target[method].interfaceList = list;

    } else {

      target.interfaceList = list;

    }

    return target;

  };

}