/// <reference path="../constants.ts" />
/// <reference path="objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: labelArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------
  
  export class LabelArray extends ObjectArray {
    constructor() {
      super(_C.Object.Type.LABEL_ARRAY)
    }
  }
}