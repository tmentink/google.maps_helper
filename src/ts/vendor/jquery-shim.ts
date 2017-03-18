
/**
 * ------------------------------------------------------------------------
 * Google Maps Helper (v1.0.0): jquery-shim.ts
 * ------------------------------------------------------------------------
 */



 !(function(window) {
    "use strict";

    // if jQuery is already loaded then exit shim
    if (window.jQuery) {
      return;
    }


    /**
     * ------------------------------------------------------------------------
     * Private 
     * ------------------------------------------------------------------------
     */

      const class2type = {}
      const hasOwn = class2type.hasOwnProperty
      const toString = class2type.toString

      const types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
      for (var i = 0; i < types.length; i++) {
        class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
      }


    /**
     * ------------------------------------------------------------------------
     * Public Functions 
     * ------------------------------------------------------------------------
     */
    class $ {

      public isWindow(obj) {
        return obj && obj === obj.window;
      }

      public type(obj) {
        if (!obj) {
          return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
      }

      public isArray(obj) {
        return Array.isArray || function(obj) {
          return this.type(obj) === "array"
        }
      }

      public isPlainObject(obj) {
        let key;

        if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
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
      }


      public extend() {
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
        if ( typeof target !== "object" && !window.jQuery.isFunction( target ) ) {
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
              if ( deep && copy && ( this.isPlainObject( copy ) ||
                ( copyIsArray = this.isArray( copy ) ) ) ) {

                if ( copyIsArray ) {
                  copyIsArray = false;
                  clone = src && this.isArray( src ) ? src : [];

                } else {
                  clone = src && this.isPlainObject( src ) ? src : {};
                }

                // Never move original objects, clone them
                target[ name ] = this.extend( deep, clone, copy );

              // Don't bring in undefined values
              } else if ( copy !== undefined ) {
                target[ name ] = copy;
              }
            }
          }
        }

        // Return the modified object
        return target;
      }
    }


    return $;

  })(this);

