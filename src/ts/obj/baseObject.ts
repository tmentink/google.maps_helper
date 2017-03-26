// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: baseObject.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _GMH = GMH.__gmh__

  
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
        Parent: function(){ return Data[type][id] }
      }
      this.Type = type
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public getBounds() {
      return _GMH[this.Type].getBounds(this.ID)
    }

    public getCenter() {
      return _GMH[this.Type].getCenter(this.ID)
    }

    public hide() {
      return _GMH[this.Type].hide(this.ID)
    }

    public not() {
      return Util.copy(Data[this.Type], this.ID)
    }

    public remove() {
      return _GMH[this.Type].remove(this.ID)
    }

    public reset() {
      return _GMH[this.Type].reset(this.ID)
    }

    public show() {
      return _GMH[this.Type].show(this.ID)
    }

    public toggle() {
      return _GMH[this.Type].toggle(this.ID)
    }

    public update(options: any) {
      return _GMH[this.Type].update(this.ID, options)
    }
  }

}

