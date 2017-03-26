/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  export class Label extends BaseObject {
    
    constructor(id: string, options: IGoogleLabelOptions) {
      const obj = new Obj.googleLabel(options)
      super(id, options, obj, _C.Object.Type.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public updatePosition(position: any) {
      return GMH.Label.updatePosition(this.ID, position)
    }
  }

}

