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


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public getBounds() {
      return GMH.Label.getBounds(this.getIDs())
    }

    public getCenter() {
      return GMH.Label.getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return GMH.Util.getGoogleObjects(this)
    }

    public getIDs() {
      return GMH.Util.getIDs(this)
    }

    public hide() {
      return GMH.Label.hide(this.getIDs())
    }

    public not() {
      return GMH.Util.copy($.Label, this.getIDs())
    }

    public remove() {
      return GMH.Label.remove(this.getIDs())
    }

    public reset() {
      return GMH.Label.reset(this.getIDs())
    }

    public show() {
      return GMH.Label.show(this.getIDs())
    }

    public toggle() {
      return GMH.Label.toggle(this.getIDs())
    }

    public update(options: IGoogleLabelOptions) {
      return GMH.Label.update(this.getIDs(), options)
    }

    public updatePosition(position: any) {
      return GMH.Label.updatePosition(this.getIDs(), position)
    }
  }

}

