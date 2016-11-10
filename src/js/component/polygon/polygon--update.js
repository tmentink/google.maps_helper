
// ===========================================
// Polygon - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Polygon Object
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
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMultiUpdate(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      return _update(id, options);
    }

    var _executeMultiUpdate = function(polygons) {
      var polyArray = [];

      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygons[id] == undefined) {
          continue;
        }

        // get the options
        var options = polygons[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Polygon : options;

        // add polygon object to array
        polyArray.push(_update(id, options));
      }

      return polyArray;
    }


    // Execute Update Path
    // =======================================
    var _executeUpdatePath = function(id, path) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMultiUpdatePath(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // check if path is supplied
      if (path == null) {
        console.log("ERROR: Must supply a path");
        return;
      }

      return _updatePath(id, path);
    }

    var _executeMultiUpdatePath = function(polygons) {
      var polyArray = [];

      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygons[id] == undefined) {
          continue;
        }

        // get the path
        var path = polygons[i][id];

        // skip over if  path is null
        if (path == null) {
          continue;
        }

        // add polygon object to array
        polyArray.push(_updatePath(id, path));
      }

      return polyArray;
    }


    // Actions
    // =======================================
    var _update = function(id, options) {
      // convert the path if it is a string
      if (typeof options.path == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }
      
      // update polygon with new options
      GMH.Data.Polygons[id].Obj.setOptions(options);

      return GMH.Data.Polygons[id];
    }

    var _updatePath = function(id, path) {
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // update the polygons path
      GMH.Data.Polygons[id].Obj.setOptions({"paths": path});

      return GMH.Data.Polygons[id];
    }


    // Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});




  