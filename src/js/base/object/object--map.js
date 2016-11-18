
// ===========================================
// Object - Map
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Map Object
    // =======================================
    var Map = function(obj) {
      this.Obj = obj;
    };

    Map.prototype = {
      ObjectType: "Map",
      reset: function() { return GMH.Map.reset(); },
      update: function(options) { return GMH.Map.update(options); },
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id); },
      addListener: function(type, fn) { return GMH.Map.addListener(type, fn); },
      removeListenerType: function(type) { return GMH.Map.removeListenerType(type); },
      removeAllListeners: function() { return GMH.Map.removeAllListeners(); }
    };
    

    // Expose Public Objects
    // =======================================
    GMH.Object.Map = Map;


    return GMH;
  })(GMH || {});

