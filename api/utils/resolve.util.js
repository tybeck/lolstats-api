'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var inversify_config_1 = require("../inversify.config");
var identifiers_constant_1 = require("../constants/identifiers.constant");
var UNKNOWN_METHOD = 'Method not found';
function resolve(type, method) {
    return (function (req, res, next) {
        var instance = inversify_config_1.container.get(type), fn = instance[method];
        if (typeof fn !== 'undefined') {
            var args_1 = [];
            if (fn && fn.interfaceList) {
                fn
                    .interfaceList
                    .forEach(function (_interface) {
                    if (typeof _interface === 'function') {
                        args_1.push(_interface.apply({
                            'request': req,
                            'response': res
                        }));
                    }
                    else {
                        try {
                            var inst = inversify_config_1.container.get(_interface);
                            if (inst.constructor.populate) {
                                _.extend(inst, req.body);
                                args_1.push(inst);
                            }
                        }
                        catch (e) {
                            switch (_interface) {
                                case identifiers_constant_1.IDENTIFIERS.Response:
                                    args_1.push(res);
                                    break;
                                case identifiers_constant_1.IDENTIFIERS.Request:
                                    args_1.push(req);
                                    break;
                                case identifiers_constant_1.IDENTIFIERS.Next:
                                    args_1.push(next);
                                    break;
                            }
                        }
                    }
                });
            }
            fn.apply(instance, args_1);
        }
        else {
            throw new Error(UNKNOWN_METHOD);
        }
    });
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.util.js.map