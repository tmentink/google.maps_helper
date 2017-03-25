// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: jquery-shim.js 
// ------------------------------------------------------------------------

!(function(window) {
  "use strict"

  // if jQuery is already loaded then exit shim
  if (window.jQuery) {
    return;
  }


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  var class2type = {
    "[object Boolean]"  : "boolean",
    "[object Number]"   : "number",
    "[object String]"   : "string",
    "[object Function]" : "function",
    "[object Array]"    : "array",
    "[object Date]"     : "date",
    "[object RegExp]"   : "regexp",
    "[object Object]"   : "object",
    "[object Error]"    : "error"
  };

  var hasOwn   = class2type.hasOwnProperty;
  var toString = class2type.toString;
  

  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  var $ = {};

  $.isWindow = function(obj) {
    return obj && obj === obj.window;
  };

  $.type = function(obj) {
    if (!obj) {
      return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
  };

  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };

  $.isPlainObject = function(obj) {
    var key;

    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
      return false;
    }

    try {
      if (obj.constructor &&
          !hasOwn.call(obj, "constructor") &&
          !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }

    for (key in obj) {
    }

    return key === undefined || hasOwn.call(obj, key);
  };

  $.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[ 0 ] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;

      // Skip the boolean and the target
      target = arguments[ i ] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
      target = this;
      i--;
    }

    for ( ; i < length; i++ ) {

      // Only deal with non-null/undefined values
      if ( ( options = arguments[ i ] ) != null ) {

        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( $.isPlainObject( copy ) ||
            ( copyIsArray = $.isArray( copy ) ) ) ) {

            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && $.isArray( src ) ? src : [];

            } else {
              clone = src && $.isPlainObject( src ) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = $.extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    return target;
  };

  window.$ = $;
  window.jQuery = $;

})(window);

