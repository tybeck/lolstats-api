'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @method override
 * Allows us to tag methods in children classes that are overriding their parent methods
 * @constructor
 */
function override() {
    return function (target, key) {
        if (target.hasOwnProperty(key)) {
            var parent_1 = Object.getPrototypeOf(target), container = parent_1, found = false;
            while (container !== null) {
                if (container &&
                    container.hasOwnProperty(key)) {
                    found = true;
                    break;
                }
                if (container &&
                    typeof container === 'object') {
                    container = Object.getPrototypeOf(container);
                }
            }
            if (!found) {
                throw new Error('Method '
                    .concat(key, ' of ', parent_1.constructor.name, ' does not override any base class method'));
            }
        }
    };
}
exports.override = override;
//# sourceMappingURL=override.decorator.js.map