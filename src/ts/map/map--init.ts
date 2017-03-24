// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--init.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------

  /**
   * Creates a map at the given HTML container and saves it in GMH.$.Map
   * @param containerID The id of the HTML container
   * @param userOptions User options are merged with defaults
   */
  export function init(containerID: string, userOptions: {}): Obj.Map {
    const defaults = Config.Default.Map || _C.Default.Map
    const options = jQuery.extend({}, defaults, userOptions)
    
    $.Map = new Obj.Map(containerID, options)
    return $.Map
  }

}

