
// ===========================================
// Label - Update
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
    var updateLabel = function(id, options) {
      return _executeUpdate(id, options);
    }

    var updatePosition = function(id, position) {
      return _executeUpdatePosition(id, position);
    }


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Label : options;

      // convert position into latlng
      if ($.type(options.position) == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }

      if ($.isArray(id)) {
        return _executeUpdateMulti(id, options);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _update(id, options);
    };

    var _executeUpdateMulti = function(ids, options) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Label[id] == undefined) {
          continue;
        }

        // add label object to array
        var label = _update(id, options);
        labelArray[label.ID] = label;
      }

      return labelArray;
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
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(ids, position) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Label[id] == undefined) {
          continue;
        }

        // add Label object to array
        var label = _updatePosition(id, position);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      GMH.Data.Label[id].Obj.setOptions(options);

      return GMH.Data.Label[id];
    };

    var _updatePosition = function(id, position) {
      GMH.Data.Label[id].Obj.setOptions({"position": position});

      return GMH.Data.Label[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.update = updateLabel;
    GMH.Label.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 