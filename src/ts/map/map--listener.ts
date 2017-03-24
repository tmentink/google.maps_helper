// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--listener.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Adds an event listener to the map 
   * @param type A string or array of event types
   * @param fn The function to be executed when event is triggered 
   */
  export function addListener(type: string | Object[], fn: Function): Obj.Map {
    if (jQuery.isArray(type)) {
      multiAdd(type)
    }
    else {
      singleAdd(type, fn)
    }

    return $.Map
  }

  /**
   * Removes all listeners of the given type from the map 
   * @param type A string or array of event types 
   */
  export function removeListenerType(type: any): Obj.Map {
    if (jQuery.type(type) == "string") {
      type.split(",")
    }

    removeType(type)
    return $.Map
  }

  /**
   * Removes all listeners from the map 
   */
  export function removeAllListeners(): Obj.Map {
    google.maps.event.clearInstanceListeners($.Map.Obj);
    return $.Map
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function singleAdd(type: string, fn: Function): void {
    type = Util.getEventType(type);
    google.maps.event.addListener($.Map.Obj, type, fn);
  }

  function multiAdd(types: Object[]): void {
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = Object.keys(types[i])[0];
      let fn = types[i][type];

      type = Util.getEventType(type);
      google.maps.event.addListener($.Map.Obj, type, fn);
    }
  }

  function removeType(types: string[]): void {
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = Util.getEventType(types[i])
      google.maps.event.clearListeners($.Map.Obj, type);
    }
  }

}

