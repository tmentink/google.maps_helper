/// <reference path="../obj/marker.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker--display.ts 
// ------------------------------------------------------------------------

namespace GMH.Marker {


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const Action = {
    HIDE   : "hide", 
    SHOW   : "show",
    TOGGLE : "toggle"
  }

  const Visibility = {
    hide   : function(id) { return false },
    show   : function(id) { return true },
    toggle : function(id) { return !_D.Marker[id].Obj.getVisible() }
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Sets the marker's visiblity to false
   * @param id The id of the Marker. Can also be an array of ids
   */
  export function hide(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    return _display(id, Action.HIDE)
  }

  /**
   * Sets the marker's visiblity to true
   * @param id The id of the Marker. Can also be an array of ids
   */
  export function show(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    return _display(id, Action.SHOW)
  }

  /**
   * Toggles the marker's visiblity
   * @param id The id of the Marker. Can also be an array of ids
   */
  export function toggle(id: string | string[]): Obj.Marker | Obj.MarkerArray {
    return _display(id, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _display(id: string | string[], action: string): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiDisplay(id, action)
    }

    if (_D.Marker[id]) {
      return _setMarkerVisibility(id, action)
    }
  }

  function _multiDisplay(ids: string[], action: string): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Marker[id]) {
        markerArray[id] = _setMarkerVisibility(id, action)
      }
    }

    return markerArray
  }

  function _setMarkerVisibility(id: string, action: string): Obj.Marker {
    _D.Marker[id].Obj.setOptions({ "visible": Visibility[action](id) })
    return _D.Marker[id]
  }

}

