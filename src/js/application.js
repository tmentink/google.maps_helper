
// ===========================================
// jQuery Shim
// ===========================================

  !(function(window) {
    "use strict";

    // if jQuery is already loaded then exit shim
    if (window.jQuery) {
      return;
    }


    // jQuery Base
    // =======================================
    var $ = {};


    // Extend
    // =======================================
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
            if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
              ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && jQuery.isArray( src ) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject( src ) ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = jQuery.extend( deep, clone, copy );

            // Don't bring in undefined values
            } else if ( copy !== undefined ) {
              target[ name ] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    };


    // Add to Window
    // =======================================
    window.$ = $;


  })(window);







// ===========================================
// Data
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Data Class
    // =======================================
    GMH.Data = {};
    GMH.Data.Map = {};
    GMH.Data.Polygons = {};


    return GMH;
  })(GMH || {});


// ===========================================
// Defaults
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Default Class
    // =======================================
    GMH.Defaults = {};
    

    // Map Defaults
    // =======================================
    GMH.Defaults.Map = {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    // Polygon Defaults
    // =======================================
    GMH.Defaults.Polygon = {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#1984AE',
      fillOpacity: 0.8
    }


    // Set Defaults
    // =======================================
    var setDefaults = function(type, userOptions) {
      return _changeDefaults("set", type, userOptions);
    }


    // Update Defaults
    // =======================================
    var updateDefaults = function(type, userOptions) {
      return _changeDefaults("update", type, userOptions);
    }


    // Change Defaults
    // =======================================
    var _changeDefaults = function(action, type, userOptions) {    
      type = _getType(type);
      
      var newOptions = userOptions;

      if (action == "update") {
        // get defaults
        var defaults = GMH.Defaults[type];

        // combine user and default options
        newOptions = $.extend({}, defaults, userOptions);
      }

      // set new defaults
      GMH.Defaults[type] = newOptions;
    }


    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
      type = type.toLowerCase();

      switch(type) {
        case "map":
          type = "Map";
          break;

        case "maps":
          type = "Map";
          break;

        case "polygon":
          type = "Polygon";
          break;

        case "polygons":
          type = "Polygon";
          break;
      }

      return type;
    }


    // Public Methods
    // =======================================
    GMH.Defaults.set = setDefaults;
    GMH.Defaults.update = updateDefaults;


    return GMH;
  })(GMH || {});






// ===========================================
// Extensions - Polygon
// ===========================================

  !(function() {
    "use strict";

    // Get Bounds
    // =======================================
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      
      // loop through each path
      for (var i = 0, i_len = paths.length; i < i_len; i++) {
        var path = paths.getAt(i);

        // loop through all points in path
        for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
          bounds.extend(path.getAt(j));
        }
      }

      return bounds;
    }

  })();




  

// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Utility Class
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // To LatLng Array
    // =======================================
    var toLatLngArray = function(str) {
      try {
        var latLngArray = [];

        // split the string into an array of coordinatePairs
        var coordPairs = str.split("|");

        for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
          var points = coordPairs[i].split(",");
          
          // create a latLng object
          var latLng = { lat: parseFloat(points[0]), lng: parseFloat(points[1]) };

          // add to latLngArray
          latLngArray.push(latLng);
        }

        return latLngArray;
      }
      catch (ex) {
        console.log(ex);
        return [];
      }
    }


    // Public Methods
    // =======================================
    GMH.Utility.toLatLngArray = toLatLngArray;


    return GMH;
  })(GMH || {});






// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Set Bounds
    // =======================================
    var setBounds = function(type, id) {
      return _execute(type, id);
    }


    // Execute
    // =======================================
    var _execute = function(type, id) {
      try {
        // check if array of types is passed
        if (Array.isArray(type)) {
          return _executeMultiTypes(type);
        }

        type = _getType(type);
        
        // set map bounds and zoom to it's initial value
        if (type == "initial") {
          GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
          GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
          return true;
        }

        // get the bounds for all the ids in the given type
        if (typeof id == "undefined") {
          var bounds = _getBoundsMulti(type, _getIDs(type));
          GMH.Data.Map.Obj.fitBounds(bounds);
          return true;
        }

        // get the bounds of the id
        var bounds = _getBounds(type, id);

        // set maps bounds 
        GMH.Data.Map.Obj.fitBounds(bounds);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiTypes = function(types) {
      try {
        var bounds = new google.maps.LatLngBounds();

        // loop through each type object
        for (var i = 0, i_len = types.length; i < i_len; i++) {
          var type = _getType(types[i].type);
          var id = types[i].id ? types[i].id : types[i].ids;

          bounds.union(_getBounds(type, id));
        }

        // set maps bounds
        GMH.Data.Map.Obj.fitBounds(bounds); 
   
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Get Bounds
    // =======================================
    var _getBounds = function(type, id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _getBoundsMulti(type, id);
      }

      // return empty bounds if id doesn't match
      if (GMH.Data[type][id] == undefined) { 
        return new google.map.LatLngBounds(); 
      }

      // return the bounds of the id
      return GMH.Data[type][id].Obj.getBounds();
    }

    var _getBoundsMulti = function(type, ids) {
      var bounds = new google.maps.LatLngBounds();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
          
        // skip over ids that aren't found
        if (GMH.Data[type][id] == undefined) { 
          continue; 
        }

        // merge bounds
        bounds.union(GMH.Data[type][id].Obj.getBounds());
      }

      return bounds;
    }
    

    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
      switch(type.toLowerCase()) {
        case "polygon":
          type = "Polygons";
          break;

        case "polygons":
          type = "Polygons";
          break;

        case "initial":
          type = "initial";
          break;

        case "init":
          type = "initial";
          break;
      }

      return type;
    }


    // Get Ids
    // =======================================
    // get an array of all the ids for the given data type
    var _getIDs = function(type) {
      var ids = {};
      ids = Object.keys(GMH.Data[type]);

      // remove _index from the array
      ids.splice(ids.indexOf("_index"), 1);

      return ids;
    }


    // Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;


    return GMH;
  })(GMH || {});



    


// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      try {
        // get default options
        var defaults = $.extend({}, {}, GMH.Defaults.Map); 

        // combine user and default options
        var options = $.extend({}, defaults, userOptions)
       
        // create new map and save reference
        GMH.Data.Map.Obj = new google.maps.Map(document.getElementById(container), options);

        // save bounds after map has finished initializing
        setTimeout(function() {
          GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
          GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
        }, 500);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Get Index
    // =======================================
    // create an index variable for auto creating an id
    GMH.Data.Polygons._index = 0;

    var _getIndex = function() {
      var i = GMH.Data.Polygons._index;

      // increment the index
      GMH.Data.Polygons._index++;

      return i;
    }


    // Add Polygon
    // =======================================
    var addPolygon = function(id, path, options) {
      return _execute(id, path, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, path, userOptions) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(id);
        }

        // default id to next index in the Polygons object
        if (id == null) { 
          id = _getIndex();
        }

        // check if id already exists
        if (GMH.Data.Polygons[id]) {
          console.log("ERROR: ID already exists");
          return false;
        }

        // check if path is supplied
        if (path == null) {
          console.log("ERROR: Must supply a path");
          return false;
        }

        _add(id, path, userOptions);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(polygons) {
      try {
        var results = [];

        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var path = polygons[i].path;
          var options = polygons[i].options;

          // default id to next index in the Polygons object
          if (id == null) { 
            id = _getIndex();
          }

          // skip over if id already exists or path is null
          if (GMH.Data.Polygons[id] || path == null) {
            results.push(false);
            continue;
          }

          _add(id, path, options);
          results.push(true);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Actions
    // =======================================
    var _add = function(id, path, userOptions) {
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Polygon, userOptions);

      // add path to options
      options.paths = path;

      // create new google polygon
      var poly = new google.maps.Polygon(options);

      // store the id in the Data.Polygons object
      GMH.Data.Polygons[id] = {};

      // add GMH object to polygon
      poly.GMH = {
        ID: id,
        Parent: GMH.Data.Polygons[id]
      };

      // save the google polygon object
      GMH.Data.Polygons[id].Obj = poly;

      // add polygon to map
      poly.setMap(GMH.Data.Map.Obj);
    }


    // Public Methods
    // =======================================
    GMH.Polygon.add = addPolygon;
    

    return GMH;
  })(GMH || {});




  

// ===========================================
// Polygon - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Delete Polygon
    // =======================================
    var deletePolygon = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        _delete(id);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(ids) {
      try {
        var results = [];

        // loop through each id
        for (var i = 0, i_len = ids.length; i < i_len; i++) {
          var id = ids[i];
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(true);
          _delete(id);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Actions
    // =======================================
    var _delete = function(id) {
      // remove polygon from map then delete it from Polygons object
      GMH.Data.Polygons[id].Obj.setMap(null);
      delete GMH.Data.Polygons[id];
    }


    // Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Toggle Polygon
    // =======================================
    var togglePolygon = function(id) {
      return _execute("toggle", id);
    }


    // Show Polygon
    // =======================================
    var showPolygon = function(id) {
      return _execute("show", id);
    }


    // Hide Polygon
    // =======================================
    var hidePolygon = function(id) {
      return _execute("hide", id);
    }


    // Execute
    // =======================================
    var _execute = function(action, id) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(action, id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        _switch(action, id);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(action, ids) {
      try {
        var results = [];

        // loop through each id
        for (var i = 0, i_len = ids.length; i < i_len; i++) {
          var id = ids[i];
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(true);
          _switch(action, id);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _switch = function(action, id) {
      switch(action) {
        case "toggle":
          _toggle(id);
          break;

        case "show":
          _show(id);
          break;

        case "hide":
          _hide(id);
          break;
      }
    }


    // Actions
    // =======================================
    var _toggle = function(id) {
      // set the polygons visibility to the opposite of its current state
      var state = GMH.Data.Polygons[id].Obj.getVisible();
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": !state });
    }

    var _show = function(id) {
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": true });
    }

    var _hide = function(id) {
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": false });
    }


    // Public Methods
    // =======================================
    GMH.Polygon.toggle = togglePolygon;
    GMH.Polygon.show = showPolygon;
    GMH.Polygon.hide = hidePolygon;
    

    return GMH;
  })(GMH || {});




  

// ===========================================
// Polygon - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Add Listener
    // =======================================
    var addListener = function(id, type, fn) {
      return _execute(id, type, fn);
    }


    // Execute
    // =======================================
    var _execute = function(id, type, fn) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        return _addListener(id, type, fn);
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(polygons) {
      try {
        var results = [];

        // loop through each id
        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var type = polygons[i].type;
          var fn = polygons[i].fn;
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(_addListener(id, type, fn));
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Actions
    // =======================================
    var _addListener = function(id, type, func) {
      try {
        google.maps.event.addListener(GMH.Data.Polygons[id].Obj, type, func);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Public Methods
    // =======================================
    GMH.Polygon.addListener = addListener;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Update Polygon
    // =======================================
    var updatePolygon = function(id, options) {
      return _executeUpdate(id, options);
    }


    // Update Path
    // =======================================
    var updatePath = function(id, path) {
      return _executeUpdatePath(id, path);
    }


    // Execute Update
    // =======================================
    var _executeUpdate = function(id, options) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMultiUpdate(id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        // get default options
        if (options == null) {
          options = GMH.Defaults.Polygon;
        }

        _update(id, options);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiUpdate = function(polygons) {
      try {
        var results = [];

        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var options = polygons[i].options;

          // skip over if id doesnt exists
          if (GMH.Data.Polygons[id] == undefined) {
            results.push(false);
            continue;
          }

          // get default options
          if (options == null) {
            options = GMH.Defaults.Polygon;
          }

          results.push(true);
          _update(id, options);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Execute Update Path
    // =======================================
    var _executeUpdatePath = function(id, path) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMultiUpdatePath(id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        // check if path is supplied
        if (path == null) {
          console.log("ERROR: Must supply a path");
          return false;
        }

        _updatePath(id, path);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiUpdatePath = function(polygons) {
      try {
        var results = [];

        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var path = polygons[i].path;

          // skip over if id doesnt exists or path is null
          if (GMH.Data.Polygons[id] == undefined || path == null) {
            results.push(false);
            continue;
          }

          results.push(true);
          _updatePath(id, path);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Actions
    // =======================================
    var _update = function(id, options) {
      // convert the path if it is a string
      if (typeof options.path == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }
      
      GMH.Data.Polygons[id].Obj.setOptions(options);
    }

    var _updatePath = function(id, path) {
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      GMH.Data.Polygons[id].Obj.setOptions({"paths": path});
    }


    // Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});




  