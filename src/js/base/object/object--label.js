
// ===========================================
// Object - Label
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Label Object
    // =======================================
    var Label = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Label.prototype = {
      ObjectType: "Label",
      not: function() { return GMH.Utility.copy(GMH.Data.Label, this.ID) },
      hide: function() { return GMH.Label.hide(this.ID); },
      show: function() { return GMH.Label.show(this.ID); },
      toggle: function() { return GMH.Label.toggle(this.ID); },
      delete: function() { return GMH.Label.delete(this.ID); },
      reset: function() { return GMH.Label.reset(this.ID); },
      update: function(options) { return GMH.Label.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Label.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Label.getBounds(this.ID); },
      getCenter: function() { return GMH.Label.getCenter(this.ID); }
    };


    // Label Array Object
    // =======================================
    var LabelArray = function() {
      this._i = 0;
    };

    LabelArray.prototype = {
      ObjectType: "LabelArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Label, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Label.hide(this.IDs()); },
      show: function() { return GMH.Label.show(this.IDs()); },
      toggle: function() { return GMH.Label.toggle(this.IDs()); },
      delete: function() { return GMH.Label.delete(this.IDs()); },
      reset: function() { return GMH.Label.reset(this.IDs()); },
      update: function(options) { return GMH.Label.update(this.IDs(), options); },
      updatePosition: function(position) { return GMH.Label.updatePosition(this.IDs(), position); },
      getBounds: function() { return GMH.Label.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Label.getCenter(this.IDs()); }
    };
    

    // Expose Public Objects
    // =======================================
    GMH.Object.Label = Label;
    GMH.Object.LabelArray = LabelArray;


    return GMH;
  })(GMH || {});

