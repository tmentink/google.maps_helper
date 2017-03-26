/// <reference path="../label/label--updatePosition.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: labelArray.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _Label = GMH.__gmh__.Label


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------
  
  export class LabelArray extends BaseObjectArray {
    
    constructor() {
      super(Constants.Object.Type.LABEL_ARRAY, Constants.Object.Type.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public updatePosition(position: any) {
      return _Label.updatePosition(this.getIDs(), position)
    }
  }

}

