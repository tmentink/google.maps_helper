/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: map--update.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the map's options
   * @param options google.map.MapOptions object. If null, options will be set to defaults
   */
  export function update(options: google.maps.MapOptions): Obj.Map {
    const defaults = Config.Default.Map || Constants.Default.Map
    options = options == null ? defaults : options

    if (jQuery.type(options.center) == "string") {
      options.center = Util.toLatLng(options.center)
    }

    Data.Map.Obj.setOptions(options)
    return Data.Map
  }

  /**
   * Resets the map to its initialized state
   */
  export function reset() {
    Data.Map.Obj.fitBounds(Data.Map.Init.Bounds)
    return update(Data.Map.Init.Options)
  }
  
}

