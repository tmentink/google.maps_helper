
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




  