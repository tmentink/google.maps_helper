/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  export class Label {
    ID: string
    Init: {
      Options: IGoogleLabelOptions
    }
    Obj: google.maps.OverlayView
    Type: string 

    constructor(id: string, options: IGoogleLabelOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new Obj.googleLabel(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Label[id] }
      }
      this.Type = _C.Object.Type.LABEL
    }

  }

}