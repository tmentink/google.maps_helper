var GMH;
(function (GMH) {
    var util;
    (function (util) {
        var copy = function () {
        };
    })(util = GMH.util || (GMH.util = {}));
})(GMH || (GMH = {}));
var util;
(function (util) {
    function addNumbers(a, b) {
        return a + b;
    }
    util.addNumbers = addNumbers;
    function addStrings(a, b) {
        return parseInt(a) + parseInt(b);
    }
    util.addStrings = addStrings;
    function multiply(a, b) {
        return a * b;
    }
    util.multiply = multiply;
    function divide(a, b) {
        return a / b;
    }
    util.divide = divide;
})(util || (util = {}));
console.log(util.divide(1, 5));
!(function (window) {
    "use strict";
    if (window.jQuery) {
        return;
    }
    var class2type = {};
    var hasOwn = class2type.hasOwnProperty;
    var toString = class2type.toString;
    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
        class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }
    var $ = (function () {
        function $() {
        }
        $.prototype.isWindow = function (obj) {
            return obj && obj === obj.window;
        };
        $.prototype.type = function (obj) {
            if (!obj) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        };
        $.prototype.isArray = function (obj) {
            return Array.isArray || function (obj) {
                return this.type(obj) === "array";
            };
        };
        $.prototype.isPlainObject = function (obj) {
            var key;
            if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
                return false;
            }
            try {
                if (obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
            for (key in obj) {
            }
            return key === undefined || hasOwn.call(obj, key);
        };
        $.prototype.extend = function () {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[i] || {};
                i++;
            }
            if (typeof target !== "object" && !window.jQuery.isFunction(target)) {
                target = {};
            }
            if (i === length) {
                target = this;
                i--;
            }
            for (; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue;
                        }
                        if (deep && copy && (this.isPlainObject(copy) ||
                            (copyIsArray = this.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && this.isArray(src) ? src : [];
                            }
                            else {
                                clone = src && this.isPlainObject(src) ? src : {};
                            }
                            target[name] = this.extend(deep, clone, copy);
                        }
                        else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        };
        return $;
    }());
    return $;
})(this);
//# sourceMappingURL=application.js.map