/// <reference path="../obj/label.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label--add.ts 
// ------------------------------------------------------------------------

namespace GMH.Label {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Creates a label object, adds it to the map and stores it in GMH._D.Label
   * @param id The id of the label. Can also pass in an array of IAddLabelParms
   * @param text The label text. If null, text will be the label's id 
   * @param position The position of the label. Can be a string, a LatLng or a LatLngLiteral
   * @param userOptions User options are merged with defaults
   */
  export function add(id: string | IAddLabelParms[], text: string, position: any, userOptions: IGoogleLabelOptions): Obj.Label | Obj.LabelArray {
    return _add(id, text, position, userOptions)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _add(id: string | IAddLabelParms[], text: string, position: any, userOptions: IGoogleLabelOptions): Obj.Label | Obj.LabelArray {
    if (jQuery.isArray(id)) {
      return _multiAdd(id)
    }

    if (_validParameters(id, position)) {
      return _addLabel(id, text, position, userOptions)
    }
  }

  function _multiAdd(objects: IAddLabelParms[]): Obj.LabelArray {
    const labelArray = new Obj.LabelArray()

    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      let id = objects[i].id
      let text = objects[i].text
      let position = objects[i].position
      let userOptions = objects[i].options

      if (_validParameters(id, position)) {
        labelArray[id] = _addLabel(id, text, position, userOptions)
      }
    }

    return labelArray
  }

  function _addLabel(id: any, text: string, position: any, userOptions: IGoogleLabelOptions): Obj.Label {
    if (jQuery.type(position) == "string") {
      position = Util.toLatLng(position)
    }

    const defaults = Config.Default.Label || {}
    const options = jQuery.extend({}, defaults, userOptions)
    options.map = _D.Map.Obj
    options.text = _getText(id, text)
    options.position = position

    _D.Label[id] = new Obj.Label(id, options)
    return _D.Label[id]
  }

  function _getText(id: any, text: string) {
    return text == null ? id : text
  }

  function _validParameters(id: any, position: any): boolean {
    if (_D.Label[id]) {
      throw "Error: ID already exists"
    }
    if (!position) {
      throw "Error: Must supply a position"
    }

    return true
  }

}

