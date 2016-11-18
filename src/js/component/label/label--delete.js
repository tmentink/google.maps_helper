
// ===========================================
// Label - Delete
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
    var deleteLabel = function(id) {
      return _execute(id);
    };


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
      return _delete(id);
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
        var label = _delete(id);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the object
      var label = GMH.Data.Label[id];

      // remove from map
      label.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Label[id];

      // return the object
      return label;
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.delete = deleteLabel;


    return GMH;
  })(GMH || {});

