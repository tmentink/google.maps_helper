// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: baseObject.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class BaseObject {
    ID: string
    Init: {
      Options: any
    }
    Obj: google.maps.MVCObject
    Type: string

    constructor(id: string, options: any, obj: google.maps.MVCObject, type: string) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = obj
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return _D[type][id] }
      }
      this.Type = type
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public getBounds() {
      return GMH[this.Type].getBounds(this.ID)
    }

    public getCenter() {
      return GMH[this.Type].getCenter(this.ID)
    }

    public hide() {
      return GMH[this.Type].hide(this.ID)
    }

    public not() {
      return GMH.Util.copy(_D[this.Type], this.ID)
    }

    public remove() {
      return GMH[this.Type].remove(this.ID)
    }

    public reset() {
      return GMH[this.Type].reset(this.ID)
    }

    public show() {
      return GMH[this.Type].show(this.ID)
    }

    public toggle() {
      return GMH[this.Type].toggle(this.ID)
    }

    public update(options: any) {
      return GMH[this.Type].update(this.ID, options)
    }
  }

}

