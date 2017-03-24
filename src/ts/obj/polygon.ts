/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Polygon {
    ID: number | string
    Obj: google.maps.Polygon
    Type: string 

    constructor(id:number | string, obj:google.maps.Polygon) {
      this.ID = id
      this.Obj = obj
      this.Type = _C.Object.Type.POLYGON
    }
  }
}