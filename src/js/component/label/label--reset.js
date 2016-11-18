
// ===========================================
// Label - Reset
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
    var resetLabel = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      // return the deleted object
      return _reset(id);
    };

    var _executeMulti = function(ids) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
          continue; 
        }

        // add label object to array
        var label = _reset(id);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _reset = function(id) {
      // get initial options
      var options = GMH.Data.Label[id].initialOptions;
      
      // return the updated object
      return GMH.Label.update(id, options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.reset = resetLabel;


    return GMH;
  })(GMH || {});

