'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @mehod interfaces
 * Used to decorate a method with commonly-used identifiers
 * @param list
 */
function interfaces(list) {
    return function (target, method) {
        if (typeof method !== 'undefined') {
            target[method].interfaceList = list;
        }
        else {
            target.interfaceList = list;
        }
        return target;
    };
}
exports.interfaces = interfaces;
//# sourceMappingURL=interfaces.decorator.js.map