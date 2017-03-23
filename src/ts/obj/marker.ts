// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const TYPE = "Marker"


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker {
    ID: number
    Obj: google.maps.Marker
    Type: string 

    constructor(id:number, obj:google.maps.Marker) {
      this.ID = id
      this.Obj = obj
      this.Type = TYPE
    }
  }
}