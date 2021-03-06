/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: label--display.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Label {


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const Action = {
    HIDE   : "hide", 
    SHOW   : "show",
    TOGGLE : "toggle"
  }

  const Visibility = {
    hide   : function(id) { return null },
    show   : function(id) { return Data.Map.Obj },
    toggle : function(id) { return Data.Label[id].Obj.map == null ? Data.Map.Obj : null }
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Sets the label's visiblity to false
   * @param id The id of the label. Can also be an array of ids
   */
  export function hide(id: string | string[]): Obj.Label | Obj.LabelArray {
    return _display(id, Action.HIDE)
  }

  /**
   * Sets the label's visiblity to true
   * @param id The id of the label. Can also be an array of ids
   */
  export function show(id: string | string[]): Obj.Label | Obj.LabelArray {
    return _display(id, Action.SHOW)
  }

  /**
   * Toggles the label's visiblity
   * @param id The id of the label. Can also be an array of ids
   */
  export function toggle(id: string | string[]): Obj.Label | Obj.LabelArray {
    return _display(id, Action.TOGGLE)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _display(id: string | string[], action: string): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiDisplay(id, action)
    }

    if (Data.Label[id]) {
      return _setLabelVisibility(id, action)
    }
  }

  function _multiDisplay(ids: string[], action: string): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (Data.Label[id]) {
        labelArray[id] = _setLabelVisibility(id, action)
      }
    }

    return labelArray
  }

  function _setLabelVisibility(id: string, action: string): Obj.Label {
    Data.Label[id].Obj.setMap(Visibility[action](id))
    return Data.Label[id]
  }

}

