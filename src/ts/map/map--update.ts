// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--update.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the map's options
   * @param options google.map.MapOptions object. If null, options will be set to defaults
   */
  export function update(options: google.maps.MapOptions): Obj.Map {
    const defaults = Config.Default.Map || _C.Default.Map
    options = options == null ? defaults : options

    if (jQuery.type(options.center) == "string") {
      options.center = Util.toLatLng(options.center);
    }

    $.Map.Obj.setOptions(options)
    return $.Map
  }

  /**
   * Resets the map to its initialized state
   */
  export function reset() {
    $.Map.Obj.fitBounds($.Map.Init.Bounds)
    return update($.Map.Init.Options)
  }
  
}

