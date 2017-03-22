// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: objectArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class ObjectArray {
    _i: number
    Type: string

    constructor(type: string = "ObjectArray") {
      this._i = 0
      this.Type = type
    }
  }
}