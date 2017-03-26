// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: baseObjectArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class BaseObjectArray {
    ChildType: string
    Type: string

    constructor(type: string, childType: string) {
      this.ChildType = childType
      this.Type = type
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public getBounds() {
      return GMH[this.ChildType].getBounds(this.getIDs())
    }

    public getCenter() {
      return GMH[this.ChildType].getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return GMH.Util.getGoogleObjects(this)
    }

    public getIDs() {
      return GMH.Util.getIDs(this)
    }

    public hide() {
      return GMH[this.ChildType].hide(this.getIDs())
    }

    public not() {
      return GMH.Util.copy($[this.ChildType], this.getIDs())
    }

    public remove() {
      return GMH[this.ChildType].remove(this.getIDs())
    }

    public reset() {
      return GMH[this.ChildType].reset(this.getIDs())
    }

    public show() {
      return GMH[this.ChildType].show(this.getIDs())
    }

    public toggle() {
      return GMH[this.ChildType].toggle(this.getIDs())
    }

    public update(options: any) {
      return GMH[this.ChildType].update(this.getIDs(), options)
    }
  }

}

