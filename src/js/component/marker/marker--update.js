
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
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Marker : options;

      // convert position into latlng
      if ($.type(options.position) == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }

      if ($.isArray(id)) {
        return _executeUpdateMulti(id, options);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
      }

      return _update(id, options);
    };

    var _executeUpdateMulti = function(ids, options) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // add marker object to array
        var marker = _update(id, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeUpdatePosition = function(id, position) {
      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // convert position into latlng
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      if ($.isArray(id)) {
        return _executeUpdatePositionMulti(id, position);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(ids, position) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
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
      GMH.Data.Marker[id].Obj.setOptions(options);

      return GMH.Data.Marker[id];
    };

    var _updatePosition = function(id, position) {
      GMH.Data.Marker[id].Obj.setOptions({"position": position});

      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.update = updateMarker;
    GMH.Marker.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 