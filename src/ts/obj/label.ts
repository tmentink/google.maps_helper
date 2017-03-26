/// <reference path="../label/label--bounds.ts" />
/// <reference path="../label/label--display.ts" />
/// <reference path="../label/label--remove.ts" />
/// <reference path="../label/label--reset.ts" />
/// <reference path="../label/label--update.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: label.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _Label = GMH.__gmh__.Label
  

  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  export class Label extends BaseObject {
    
    constructor(id: string, options: IGoogleLabelOptions) {
      const obj = new Obj.googleLabel(options)
      super(id, options, obj, Constants.Object.Type.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public updatePosition(position: any) {
      return _Label.updatePosition(this.ID, position)
    }
  }

}

