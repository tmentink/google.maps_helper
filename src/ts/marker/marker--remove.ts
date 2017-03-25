/// <reference path="../obj/marker.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker--remove.ts 
// ------------------------------------------------------------------------

namespace GMH.Marker {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Removes the marker from the map and GMH.$.Marker
   * @param id The id of the marker. Can also be an array of ids
   */
  export function remove(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    return _remove(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _remove(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiRemove(id)
    }

    if ($.Marker[id]) {
      return _removeMarker(id)
    }
  }

  function _multiRemove(ids: string[]): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Marker[id]) {
        markerArray[id] = _removeMarker(id)
      }
    }

    return markerArray
  }

  function _removeMarker(id: string): Obj.Marker {
      const marker = $.Marker[id]            
      marker.Obj.setMap(null)
      
      delete $.Marker[id]
      return marker
  }

}

