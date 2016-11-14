
// ===========================================
// Polygon - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Polygon Namespace
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Public Methods
    // =======================================
    var updatePolygon = function(id, options) {
      return _executeUpdate(id, options);
    };

    var updatePath = function(id, path) {
      return _executeupdatePath(id, path);
    };


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      if ($.isArray(id)) {
        return _executeUpdateMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      return _update(id, options);
    };

    var _executeUpdateMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the options
        var options = objects[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Polygon : options;

        // add polygon object to array
        var poly = _update(id, options);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeupdatePath = function(id, path) {
      if ($.isArray(id)) {
        return _executeupdatePathMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      // check if path is supplied
      if (path == null) {
        return console.log("ERROR: Must supply a path");
      }

      return _updatePath(id, path);
    };

    var _executeupdatePathMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the path
        var path = objects[i][id];

        // skip over if path is null
        if (path == null) {
          continue;
        }

        // add polygon object to array
        var poly = _updatePath(id, path);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      if ($.type(options.path) == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }
      
      // update with new options
      GMH.Data.Polygon[id].Obj.setOptions(options);

      return GMH.Data.Polygon[id];
    };

    var _updatePath = function(id, path) {
      if ($.type(path) == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // update the polygons path
      GMH.Data.Polygon[id].Obj.setOptions({"path": path});

      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});

 