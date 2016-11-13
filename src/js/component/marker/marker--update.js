
// ===========================================
// Marker - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Marker Namespace
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
        return console.log("ERROR: ID does not reference a marker");
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Marker : options;

      return _update(id, options);
    };

    var _executeUpdateMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the options
        var options = objects[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Marker : options;

        // add marker object to array
        var marker = _update(id, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeUpdatePosition = function(id, position) {
      if (Array.isArray(id)) {
        return _executeUpdatePositionMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a Marker");
      }

      // check if position is supplied
      if (position == null) {
        return console.log("ERROR: Must supply a position");
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the position
        var position = objects[i][id];

        // skip over if position is null
        if (position == null) {
          continue;
        }

        // add marker object to array
        var marker = _updatePosition(id, position);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      if (typeof options.position == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }
      
      // update with new options
      GMH.Data.Marker[id].Obj.setOptions(options);

      return GMH.Data.Marker[id];
    };

    var _updatePosition = function(id, position) {
      if (typeof position == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // update the markers position
      GMH.Data.Marker[id].Obj.setOptions({"position": position});

      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.update = updateMarker;
    GMH.Marker.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 