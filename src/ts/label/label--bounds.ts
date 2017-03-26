/// <reference path="../obj/label.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.Label {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Returns the bounds of the label(s)
   * @param ids The id of the label. Can also be an array of ids
   */
  export function getBounds(ids: string | string[]): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      
      if (_D.Label[id]) { 
        bounds.union(_getLabelsBounds(id))
      }
    }

    return bounds
  }

  /**
   * Returns the center LatLng object of the label(s) bounds
   * @param ids The id of the label. Can also be an array of ids
   */
  export function getCenter(id: string | string[]): google.maps.LatLng {
    return getBounds(id).getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _getLabelsBounds(id) {
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(_D.Label[id].Obj.position)
    return bounds
  }

}

