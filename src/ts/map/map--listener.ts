/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: map--listener.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Adds an event listener to the map 
   * @param type A string or array of event types
   * @param fn The function to be executed when event is triggered 
   */
  export function addListener(type: string | Object[], fn: Function): Obj.Map {
    _addListener(type, fn)
    return Data.Map
  }

  /**
   * Removes all listeners of the given type from the map 
   * @param type A string or array of event types 
   */
  export function removeListenerType(type: any): Obj.Map {
    if (jQuery.type(type) == "string") {
      type.split(",")
    }

    _removeListenerType(type)
    return Data.Map
  }

  /**
   * Removes all listeners from the map 
   */
  export function removeAllListeners(): Obj.Map {
    google.maps.event.clearInstanceListeners(Data.Map.Obj)
    return Data.Map
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _addListener(type: string | Object[], fn: Function): void {
    if (jQuery.isArray(type)) {
      return _multiAddListener(type)
    }

    type = Util.getEventType(type)
    google.maps.event.addListener(Data.Map.Obj, type, fn)
  }

  function _multiAddListener(types: Object[]): void {
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = Object.keys(types[i])[0]
      let fn = types[i][type]

      type = Util.getEventType(type)
      google.maps.event.addListener(Data.Map.Obj, type, fn)
    }
  }

  function _removeListenerType(types: string[]): void {
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = Util.getEventType(types[i])
      google.maps.event.clearListeners(Data.Map.Obj, type)
    }
  }

}

