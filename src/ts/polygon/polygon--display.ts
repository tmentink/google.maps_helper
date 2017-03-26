/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--display.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {

  import _D = GMH.__gmh__.Data


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
    toggle : function(id) { return !_D.Polygon[id].Obj.getVisible() }
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Sets the polygon's visiblity to false
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function hide(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _display(id, Action.HIDE)
  }

  /**
   * Sets the polygon's visiblity to true
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function show(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _display(id, Action.SHOW)
  }

  /**
   * Toggles the polygon's visiblity
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function toggle(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _display(id, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _display(id: string | string[], action: string): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiDisplay(id, action)
    }

    if (_D.Polygon[id]) {
      return _setPolygonVisibility(id, action)
    }
  }

  function _multiDisplay(ids: string[], action: string): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Polygon[id]) {
        polygonArray[id] = _setPolygonVisibility(id, action)
      }
    }

    return polygonArray
  }

  function _setPolygonVisibility(id: string, action: string): Obj.Polygon {
    _D.Polygon[id].Obj.setOptions({ "visible": Visibility[action](id) })
    return _D.Polygon[id]
  }

}

