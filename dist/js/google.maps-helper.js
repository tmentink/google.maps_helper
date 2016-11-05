// ===========================================
// Data
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Google Maps Helper Object
  // =======================================
  GMH.Data = {};
  GMH.Data.Map = {};
  GMH.Data.Polygons = {};
  return GMH;
}(GMH || {});

// ===========================================
// Defaults
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Google Maps Helper Object
  // =======================================
  GMH.Defaults = {};
  // Map Defaults
  // =======================================
  GMH.Defaults.Map = {
    zoom: 6,
    center: {
      lat: 37.5,
      lng: -120
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // Polygon Defaults
  // =======================================
  GMH.Defaults.Polygon = {
    strokeColor: "#FF0000",
    strokeOpacity: .8,
    strokeWeight: 1,
    fillColor: "#FF0000",
    fillOpacity: .5
  };
  // Set Defaults
  // =======================================
  var setDefaults = function(type, userOptions) {
    return _changeDefaults("set", type, userOptions);
  };
  // Update Defaults
  // =======================================
  var updateDefaults = function(type, userOptions) {
    return _changeDefaults("update", type, userOptions);
  };
  // Change Defaults
  // =======================================
  var _changeDefaults = function(action, type, userOptions) {
    try {
      // allow type to be case insensitive
      var type;
      switch (type.toLowerCase()) {
       case "map":
        type = "Map";
        break;

       case "polygon":
        type = "Polygon";
        break;
      }
      var newOptions = userOptions;
      if (action == "update") {
        // get defaults
        var defaults = GMH.Defaults[type];
        // combine user and default options
        newOptions = $.extend({}, defaults, userOptions);
      }
      // set new defaults
      GMH.Defaults[type] = newOptions;
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  // Public Methods
  // =======================================
  GMH.Defaults.set = setDefaults;
  GMH.Defaults.update = updateDefaults;
  return GMH;
}(GMH || {});

// ===========================================
// Utility
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Google Maps Helper Object
  // =======================================
  GMH.Utility = {};
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
        var latLng = {
          lat: parseFloat(points[0]),
          lng: parseFloat(points[1])
        };
        // add to latLngArray
        latLngArray.push(latLng);
      }
      return latLngArray;
    } catch (ex) {
      console.log(ex);
      return [];
    }
  };
  // Public Methods
  // =======================================
  GMH.Utility.toLatLngArray = toLatLngArray;
  return GMH;
}(GMH || {});

// ===========================================
// Map
// ===========================================
var GMH = function(GMH) {
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
      var options = $.extend({}, defaults, userOptions);
      // create new map and save reference
      GMH.Data.Map.Obj = new google.maps.Map(document.getElementById(container), options);
      return true;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  // Public Methods
  // =======================================
  GMH.Map.init = initMap;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Add
// ===========================================
var GMH = function(GMH) {
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
  };
  // Add Polygon
  // =======================================
  var addPolygon = function(id, path, options) {
    return _execute(id, path, options);
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
        results.push(true);
        _add(id, path, options);
      }
      return results;
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  // Actions
  // =======================================
  var _add = function(id, path, userOptions) {
    if (userOptions == null) {
      userOptions = {};
    }
    // get default options
    var defaults = GMH.Defaults.Polygon;
    // convert the path if it is a string
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    // add path to userOptions
    userOptions.paths = path;
    // combine user and default options
    var options = $.extend({}, defaults, userOptions);
    // create new polygon
    var poly = new google.maps.Polygon(options);
    // add polygon to map
    poly.setMap(GMH.Data.Map.Obj);
    // store the id in the Data.Polygons object
    GMH.Data.Polygons[id] = {};
    // save the google polygon object
    GMH.Data.Polygons[id].Obj = poly;
  };
  // Public Methods
  // =======================================
  GMH.Polygon.add = addPolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Delete
// ===========================================
var GMH = function(GMH) {
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
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  // Actions
  // =======================================
  var _delete = function(id) {
    // remove polygon from map then delete it from Polygons object
    GMH.Data.Polygons[id].Obj.setMap(null);
    delete GMH.Data.Polygons[id];
  };
  // Public Methods
  // =======================================
  GMH.Polygon.delete = deletePolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Display
// ===========================================
var GMH = function(GMH) {
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
  };
  // Show Polygon
  // =======================================
  var showPolygon = function(id) {
    return _execute("show", id);
  };
  // Hide Polygon
  // =======================================
  var hidePolygon = function(id) {
    return _execute("hide", id);
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  var _switch = function(action, id) {
    switch (action) {
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
  };
  // Actions
  // =======================================
  var _toggle = function(id) {
    // set the polygons visibility to the opposite of its current state
    var state = GMH.Data.Polygons[id].Obj.getVisible();
    GMH.Data.Polygons[id].Obj.setOptions({
      visible: !state
    });
  };
  var _show = function(id) {
    GMH.Data.Polygons[id].Obj.setOptions({
      visible: true
    });
  };
  var _hide = function(id) {
    GMH.Data.Polygons[id].Obj.setOptions({
      visible: false
    });
  };
  // Public Methods
  // =======================================
  GMH.Polygon.toggle = togglePolygon;
  GMH.Polygon.show = showPolygon;
  GMH.Polygon.hide = hidePolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Update
// ===========================================
var GMH = function(GMH) {
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
  };
  // Update Path
  // =======================================
  var updatePath = function(id, path) {
    return _executeUpdatePath(id, path);
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
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
    } catch (ex) {
      console.log(ex);
      return false;
    }
  };
  // Actions
  // =======================================
  var _update = function(id, options) {
    // convert the path if it is a string
    if (typeof options.path == "string") {
      options.path = GMH.Utility.toLatLngArray(options.path);
    }
    GMH.Data.Polygons[id].Obj.setOptions(options);
  };
  var _updatePath = function(id, path) {
    // convert the path if it is a string
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    GMH.Data.Polygons[id].Obj.setOptions({
      paths: path
    });
  };
  // Public Methods
  // =======================================
  GMH.Polygon.update = updatePolygon;
  GMH.Polygon.updatePath = updatePath;
  return GMH;
}(GMH || {});