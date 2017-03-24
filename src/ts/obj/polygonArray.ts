/// <reference path="../constants.ts" />
/// <reference path="objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygonArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Defintion 
  // ----------------------------------------------------------------------

  export class PolygonArray extends ObjectArray {
    constructor() {
      super(_C.Object.Type.POLYGON_ARRAY)
    }
  }
}