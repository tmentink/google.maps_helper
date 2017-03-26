// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: baseObjectArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class BaseObjectArray {
    Type: string

    constructor(type: string = "BaseObjectArray") {
      this.Type = type
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public getBounds() {
      return GMH[this.Type].getBounds(this.getIDs())
    }

    public getCenter() {
      return GMH[this.Type].getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return GMH.Util.getGoogleObjects(this)
    }

    public getIDs() {
      return GMH.Util.getIDs(this)
    }

    public hide() {
      return GMH[this.Type].hide(this.getIDs())
    }

    public not() {
      return GMH.Util.copy($[this.Type], this.getIDs())
    }

    public remove() {
      return GMH[this.Type].remove(this.getIDs())
    }

    public reset() {
      return GMH[this.Type].reset(this.getIDs())
    }

    public show() {
      return GMH[this.Type].show(this.getIDs())
    }

    public toggle() {
      return GMH[this.Type].toggle(this.getIDs())
    }

    public update(options: any) {
      return GMH[this.Type].update(this.getIDs(), options)
    }
  }

}

