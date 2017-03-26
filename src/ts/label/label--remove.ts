/// <reference path="../obj/label.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label--remove.ts 
// ------------------------------------------------------------------------

namespace GMH.Label {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Removes the label from the map and GMH._D.Label
   * @param id The id of the label. Can also be an array of ids
   */
  export function remove(id: string | string[]): Obj.Label | Obj.LabelArray {
    return _remove(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _remove(id: string | string[]): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiRemove(id)
    }

    if (_D.Label[id]) {
      return _removeLabel(id)
    }
  }

  function _multiRemove(ids: string[]): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Label[id]) {
        labelArray[id] = _removeLabel(id)
      }
    }

    return labelArray
  }

  function _removeLabel(id: string): Obj.Label {
      const Label = _D.Label[id]            
      Label.Obj.setMap(null)
      
      delete _D.Label[id]
      return Label
  }

}

