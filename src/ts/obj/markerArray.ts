/// <reference path="../constants.ts" />
/// <reference path="objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: markerArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class MarkerArray extends ObjectArray {
    constructor() {
      super(_C.Object.Type.MARKER_ARRAY)
    }
  }
}