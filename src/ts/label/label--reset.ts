/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: label--reset.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Label {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Resets the label to its initialized state
   * @param id The id of the label. Can also be an array of ids
   */
  export function reset(id: string | string[]): Obj.Label | Obj.LabelArray {
    return _reset(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------

  function _reset(id: string | string[]): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiReset(id)
    }

    if (Data.Label[id]) {
      return _resetLabel(id)
    }
  }

  function _multiReset(ids: string[]): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (Data.Label[id]) {
        labelArray[id] = _resetLabel(id)
      }
    }

    return labelArray
  }

  function _resetLabel(id: string): any {
    return update(id, Data.Label[id].Init.Options);
  }
 
}

