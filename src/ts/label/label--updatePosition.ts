/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: label--updatePosition.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Label {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the label's position 
   * @param id The id of the label. Can also be an array of ids
   * @param position The position of the label. Can be a string, a LatLng or a LatLngLiteral
   */
  export function updatePosition(id: string | string[], position: any): Obj.Label | Obj.LabelArray {
    if (jQuery.type(position) == "string") {
      position = Util.toLatLng(position)
    }

    return _updatePosition(id, position)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _updatePosition(id: string | string[], position: any): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiUpdatePosition(id, position);
    }

    if (_validParameters(id, position)) {
      return _updateLabelPosition(id, position)
    }
  }

  function _multiUpdatePosition(ids: string[], position: any): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if (_validParameters(id, position)) {
        labelArray[id] = _updateLabelPosition(id, position)
      }
    }

    return labelArray
  }

  function _updateLabelPosition(id: string, position: any): Obj.Label {
    Data.Label[id].Obj.setOptions({"position": position});
    return Data.Label[id];
  }

  function _validParameters(id: any, position: any): boolean {
    if (!Data.Label[id]) {
      throw "Error: ID does not exist"
    }
    if (!position) {
      throw "Error: Must supply a position"
    }

    return true
  }

}

