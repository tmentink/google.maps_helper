/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  export class Label {
    ID: number | string
    Obj: google.maps.OverlayView
    Type: string 

    constructor(id:number | string, obj:any) {
      this.ID = id
      this.Obj = obj
      this.Type = _C.Object.Type.LABEL
    }
  }
}