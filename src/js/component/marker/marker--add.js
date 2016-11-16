
// ===========================================
// Marker - Add
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
    var addMarker = function(id, position, options) {
      return _execute(id, position, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, position, userOptions) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Marker.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Marker[id]) {
        throw "Error: ID already exists";
      }

      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // return the marker object
      return _add(id, position, userOptions);
    };

    var _executeMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var position = objects[i].position;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? GMH.Data.Marker.nextIndex() : id;

        // skip if id already exists or position is null
        if (GMH.Data.Marker[id] || position == null) {
          continue;
        }

        // add marker object to array
        var marker = _add(id, position, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _add = function(id, position, userOptions) {
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Marker, userOptions);

      // add map and position to options
      options.map = GMH.Data.Map.Obj;
      options.position = position;

      // create new google marker
      var googleMarker = new google.maps.Marker(options);

      // add GMH object to google marker
      googleMarker.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Marker[this.ID]; }
      };

      // create new marker and save reference
      GMH.Data.Marker[id] = new GMH.Object.Marker(id, googleMarker);

      // return marker object
      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.add = addMarker;
    

    return GMH;
  })(GMH || {});

