
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




  