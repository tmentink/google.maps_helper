
// ===========================================
// Marker - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Marker Class
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }  


    // Public Methods
    // =======================================
    var updateMarker = function(id, options) {
      return _executeUpdate(id, options);
    }

    var updatePosition = function(id, position) {
      return _executeUpdatePosition(id, position);
    }


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      if (Array.isArray(id)) {
        return _executeUpdateMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a marker");
        return;
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Marker : options;

      return _update(id, options);
    }
    var _executeUpdateMulti = function(Markers) {
      var objArray = [];

      for (var i = 0, i_len = Markers.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(Markers[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the options
        var options = Markers[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Marker : options;

        // add object to array
        objArray.push(_update(id, options));
      }

      return objArray;
    }


    var _executeUpdatePosition = function(id, position) {
      if (Array.isArray(id)) {
        return _executeUpdatePositionMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a Marker");
        return;
      }

      // check if position is supplied
      if (position == null) {
        console.log("ERROR: Must supply a position");
        return;
      }

      return _updatePosition(id, position);
    }
    var _executeUpdatePositionMulti = function(Markers) {
      var objArray = [];

      for (var i = 0, i_len = Markers.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(Markers[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the position
        var position = Markers[i][id];

        // skip over if position is null
        if (position == null) {
          continue;
        }

        // add object to array
        objArray.push(_updatePosition(id, position));
      }

      return objArray;
    }


    // Actions
    // =======================================
    var _update = function(id, options) {
      if (typeof options.position == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }
      
      // update with new options
      GMH.Data.Marker[id].Obj.setOptions(options);

      return GMH.Data.Marker[id];
    }

    var _updatePosition = function(id, position) {
      if (typeof position == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // update the markers position
      GMH.Data.Marker[id].Obj.setOptions({"position": position});

      return GMH.Data.Marker[id];
    }


    // Expose Public Methods
    // =======================================
    GMH.Marker.update = updateMarker;
    GMH.Marker.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 