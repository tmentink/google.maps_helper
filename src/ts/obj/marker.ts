/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker {
    ID: number | string
    Obj: google.maps.Marker
    Type: string 

    constructor(id:number | string, obj:google.maps.Marker) {
      this.ID = id
      this.Obj = obj
      this.Type = _C.Object.Type.MARKER
    }
  }
}