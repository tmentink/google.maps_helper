// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: baseObjectArray.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _D   = GMH.__gmh__.Data
  import _GMH = GMH.__gmh__


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
      return _GMH[this.ChildType].getBounds(this.getIDs())
    }

    public getCenter() {
      return _GMH[this.ChildType].getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return Util.getGoogleObjects(this)
    }

    public getIDs() {
      return Util.getIDs(this)
    }

    public hide() {
      return _GMH[this.ChildType].hide(this.getIDs())
    }

    public not() {
      return Util.copy(_D[this.ChildType], this.getIDs())
    }

    public remove() {
      return _GMH[this.ChildType].remove(this.getIDs())
    }

    public reset() {
      return _GMH[this.ChildType].reset(this.getIDs())
    }

    public show() {
      return _GMH[this.ChildType].show(this.getIDs())
    }

    public toggle() {
      return _GMH[this.ChildType].toggle(this.getIDs())
    }

    public update(options: any) {
      return _GMH[this.ChildType].update(this.getIDs(), options)
    }
  }

}

