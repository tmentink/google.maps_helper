/// <reference path="../obj/map.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--init.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------

  /**
   * Creates a map at the given HTML container and saves it in GMH._D.Map
   * @param containerID The id of the HTML container
   * @param userOptions User options are merged with defaults
   */
  export function init(containerID: string, userOptions: google.maps.MapOptions): Obj.Map {
    const defaults = Config.Default.Map || _C.Default.Map
    const options = jQuery.extend({}, defaults, userOptions)
    
    _D.Map = new Obj.Map(containerID, options)
    return _D.Map
  }

}

