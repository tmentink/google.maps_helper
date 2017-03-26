/// <reference path="../obj/label.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label--update.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Label {

  import _D = GMH.__gmh__.Data
    
  
  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the label's options 
   * @param id The id of the label. Can also be an array of ids
   * @param userOptions If options are null, the defaults in GMH.Config are used
   */
  export function update(id: string | string[], userOptions: IGoogleLabelOptions): Obj.Label | Obj.LabelArray {
    return _update(id, _getOptions(userOptions))
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _update(id: string | string[], options: IGoogleLabelOptions): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiUpdate(id, options)
    }

    if (_D.Label[id]) {
      return _updateLabel(id, options)
    }
  }

  function _multiUpdate(ids: string[], options: IGoogleLabelOptions): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Label[id]) {
        labelArray[id] = _updateLabel(id, options)
      }
    }

    return labelArray
  }

  function _updateLabel(id: string, options: IGoogleLabelOptions): Obj.Label {
    _D.Label[id].Obj.setOptions(options);
    return _D.Label[id];
  }

  function _getOptions(options: any): IGoogleLabelOptions {
    const defaults = Config.Default.Label || {}
    options = options == null ? defaults : options

    if (jQuery.type(options.position) == "string") {
      options.position = Util.toLatLng(options.position);
    }

    return options
  }
  
}

