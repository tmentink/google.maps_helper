
// ===========================================
// Marker - Display
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
    var toggleMarker = function(id) {
      return _execute("toggle", id);
    };

    var showMarker = function(id) {
      return _execute("show", id);
    };

    var hideMarker = function(id) {
      return _execute("hide", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id) {
      if ($.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _switch(action, id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };

    // determine which action to execute
    var _switch = function(action, id) {
      switch(action) {
        case "toggle":
          return _toggle(id);

        case "show":
          return _show(id);

        case "hide":
          return _hide(id);
      }
    };


    // Actions
    // =======================================
    var _toggle = function(id) {
      // get the current visibility
      var state = GMH.Data.Marker[id].Obj.getVisible();

      // toggle the visibility
      GMH.Data.Marker[id].Obj.setOptions({ "visible": !state });

      return GMH.Data.Marker[id];
    };

    var _show = function(id) {
      GMH.Data.Marker[id].Obj.setOptions({ "visible": true });
      return GMH.Data.Marker[id];
    };

    var _hide = function(id) {
      GMH.Data.Marker[id].Obj.setOptions({ "visible": false });
      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.toggle = toggleMarker;
    GMH.Marker.show = showMarker;
    GMH.Marker.hide = hideMarker;
    

    return GMH;
  })(GMH || {});

