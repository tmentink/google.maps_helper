
// ===========================================
// Label - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }  


    // Public Methods
    // =======================================
    var toggleLabel = function(id) {
      return _execute("toggle", id);
    };

    var showLabel = function(id) {
      return _execute("show", id);
    };

    var hideLabel = function(id) {
      return _execute("hide", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id) {
      if ($.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
          continue; 
        }

        // add label object to array
        var label = _switch(action, id);
        labelArray[label.ID] = label;
      }

      return labelArray;
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
      // check if the label is on the map
      var map = (GMH.Data.Label[id].Obj.map == null) ? GMH.Data.Map.Obj : null;

      // toggle the label's map
      GMH.Data.Label[id].Obj.setMap(map);
      return GMH.Data.Label[id];
    };

    var _show = function(id) {
      GMH.Data.Label[id].Obj.setMap(GMH.Data.Map.Obj);
      return GMH.Data.Label[id];
    };

    var _hide = function(id) {
      GMH.Data.Label[id].Obj.setMap(null);
      return GMH.Data.Label[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.toggle = toggleLabel;
    GMH.Label.show = showLabel;
    GMH.Label.hide = hideLabel;
    

    return GMH;
  })(GMH || {});

