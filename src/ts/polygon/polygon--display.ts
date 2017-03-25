// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--display.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  const Action = {
    HIDE   : "hide", 
    SHOW   : "show",
    TOGGLE : "toggle"
  }

  const Visibility = {
    hide   : function(id)   { return false },
    show   : function(id)   { return true },
    toggle : function(id) { return !$.Polygon[id].Obj.getVisibile() }
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Sets the polygon's visiblity to false
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function hide(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return display(id, Action.HIDE)
  }

  /**
   * Sets the polygon's visiblity to true
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function show(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return display(id, Action.SHOW)
  }

  /**
   * Toggles the polygon's visiblity
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function toggle(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return display(id, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function display(id: string | string[], action: string): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return multiDisplay(id, action)
    }

    if ($.Polygon[id]) {
      return setPolygonVisibility(id, action)
    }
  }

  function multiDisplay(ids: string[], action: string): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Polygon[id]) {
        polygonArray[id] = setPolygonVisibility(id, action)
      }
    }

    return polygonArray
  }

  function setPolygonVisibility(id: string, action: string): Obj.Polygon {
    $.Polygon[id].Obj.setOptions({ "visible": Visibility[action](id) })
    return $.Polygon[id]
  }

}

