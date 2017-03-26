/// <reference path="../obj/map.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

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
      options.center = Util.toLatLng(options.center)
    }

    _D.Map.Obj.setOptions(options)
    return _D.Map
  }

  /**
   * Resets the map to its initialized state
   */
  export function reset() {
    _D.Map.Obj.fitBounds(_D.Map.Init.Bounds)
    return update(_D.Map.Init.Options)
  }
  
}

