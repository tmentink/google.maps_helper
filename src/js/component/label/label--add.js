
// ===========================================
// Label - Add
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
    var addLabel = function(id, text, position, options) {
      return _execute(id, text, position, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, text, position, userOptions) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Label.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Label[id]) {
        throw "Error: ID already exists";
      }

      // if left null, default text to id
      text = (text == null) ? id : text;

      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // return the label object
      return _add(id, text, position, userOptions);
    };

    var _executeMulti = function(objects) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var text = objects[i].text;
        var position = objects[i].position;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? GMH.Data.Label.nextIndex() : id;

        // skip if id already exists or position is null
        if (GMH.Data.Label[id] || position == null) {
          continue;
        }

        // if left null, default text to id
        text = (text == null) ? id : text;

        // add label object to array
        var label = _add(id, text, position, options);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _add = function(id, text, position, userOptions) {
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Label, userOptions);

      // add map, text and position to options
      options.map = GMH.Data.Map.Obj;
      options.text = text;
      options.position = position;

      // create new google label
      var googleLabel = new GMH.Object.googleLabel(options)

      // add GMH object to google label
      googleLabel.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Label[this.ID]; }
      };

      // create new label and save reference
      GMH.Data.Label[id] = new GMH.Object.Label(id, googleLabel);

      // save initial options
      GMH.Data.Label[id].initialOptions = options;

      // return label object
      return GMH.Data.Label[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.add = addLabel;
    

    return GMH;
  })(GMH || {});

