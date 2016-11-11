
// ===========================================
// Polygon - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Polygon Class
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Public Methods
    // =======================================
    var updatePolygon = function(id, options) {
      return _executeUpdate(id, options);
    }

    var updatePath = function(id, path) {
      return _executeupdatePath(id, path);
    }


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      if (Array.isArray(id)) {
        return _executeUpdateMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        console.log("ERROR: ID does not reference a Polygon");
        return;
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      return _update(id, options);
    }
    var _executeUpdateMulti = function(Polygons) {
      var objArray = [];

      for (var i = 0, i_len = Polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(Polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the options
        var options = Polygons[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Polygon : options;

        // add object to array
        objArray.push(_update(id, options));
      }

      return objArray;
    }


    var _executeupdatePath = function(id, path) {
      if (Array.isArray(id)) {
        return _executeupdatePathMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        console.log("ERROR: ID does not reference a Polygon");
        return;
      }

      // check if path is supplied
      if (path == null) {
        console.log("ERROR: Must supply a path");
        return;
      }

      return _updatePath(id, path);
    }
    var _executeupdatePathMulti = function(Polygons) {
      var objArray = [];

      for (var i = 0, i_len = Polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(Polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the path
        var path = Polygons[i][id];

        // skip over if path is null
        if (path == null) {
          continue;
        }

        // add object to array
        objArray.push(_updatePath(id, path));
      }

      return objArray;
    }


    // Actions
    // =======================================
    var _update = function(id, options) {
      if (typeof options.path == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }
      
      // update with new options
      GMH.Data.Polygon[id].Obj.setOptions(options);

      return GMH.Data.Polygon[id];
    }

    var _updatePath = function(id, path) {
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // update the polygons path
      GMH.Data.Polygon[id].Obj.setOptions({"path": path});

      return GMH.Data.Polygon[id];
    }


    // Expose Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});

 