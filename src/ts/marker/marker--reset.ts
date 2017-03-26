/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: marker--reset.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Marker {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  

  /**
   * Resets the marker to its initialized state
   * @param id The id of the marker. Can also be an array of ids
   */
  export function reset(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    return _reset(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------

  function _reset(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiReset(id)
    }

    if (Data.Marker[id]) {
      return _resetMarker(id)
    }
  }

  function _multiReset(ids: string[]): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (Data.Marker[id]) {
        markerArray[id] = _resetMarker(id)
      }
    }

    return markerArray
  }

  function _resetMarker(id: string): any {
    return update(id, Data.Marker[id].Init.Options);
  }
 
}

