'use strict';

/**
 * @method override
 * Allows us to tag methods in children classes that are overriding their parent methods
 * @constructor
 */

export function override (): Function {

  return function (target: any, key: any): void {

    if (target.hasOwnProperty(key)) {

      let parent: any = Object.getPrototypeOf(target),

        container: any = parent,

        found: boolean = false;

      while (container !== null) {

        if (
          container &&
          container.hasOwnProperty(key)
        ) {

          found = true;

          break;

        }

        if (
          container &&
          typeof container === 'object'
        ) {

          container = Object.getPrototypeOf(container);

        }

      }

      if (!found) {

        throw new Error(
          'Method '
            .concat(
              key,
              ' of ',
              parent.constructor.name,
              ' does not override any base class method'
            )
        );

      }

    }

  };

}