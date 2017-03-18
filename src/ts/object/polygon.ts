/**
 * ------------------------------------------------------------------------
 * Google Maps Helper v1.0.0: polygon.ts 
 * ------------------------------------------------------------------------
 */

namespace GMH.Object {


  /**
   * ----------------------------------------------------------------------
   * Constants 
   * ----------------------------------------------------------------------
   */
  
  const TYPE = "Polygon"


  /**
   * ----------------------------------------------------------------------
   * Class Definition 
   * ----------------------------------------------------------------------
   */

  export class Polygon {
    ID: number
    Obj: google.maps.Polygon
    Type: string 

    constructor(id:number, obj:google.maps.Polygon) {
      this.ID = id
      this.Obj = obj
      this.Type = TYPE
    }
  }
}