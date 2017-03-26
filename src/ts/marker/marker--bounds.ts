/// <reference path="../obj/marker.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.Marker {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Returns the bounds of the marker(s)
   * @param ids The id of the marker. Can also be an array of ids
   */
  export function getBounds(ids: string | string[]): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      
      if (_D.Marker[id]) { 
        bounds.union(_getMarkersBounds(id))
      }
    }

    return bounds
  }

  /**
   * Returns the center LatLng object of the marker(s) bounds
   * @param ids The id of the marker. Can also be an array of ids
   */
  export function getCenter(id: string | string[]): google.maps.LatLng {
    return getBounds(id).getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _getMarkersBounds(id) {
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(_D.Marker[id].Obj.getPosition())
    return bounds
  }

}

