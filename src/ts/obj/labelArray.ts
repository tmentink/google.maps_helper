/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: labelArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------
  
  export class LabelArray extends BaseObjectArray {
    constructor() {
      super(_C.Object.Type.LABEL_ARRAY)
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public updatePosition(position: any) {
      return GMH.Label.updatePosition(this.getIDs(), position)
    }
  }

}

