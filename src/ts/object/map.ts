/**
 * ------------------------------------------------------------------------
 * Google Maps Helper v1.0.0: map.ts 
 * ------------------------------------------------------------------------
 */

namespace GMH.Object {


  /**
   * ----------------------------------------------------------------------
   * Constants 
   * ----------------------------------------------------------------------
   */
  
  const TYPE = "Map"


  /**
   * ----------------------------------------------------------------------
   * Class Definition 
   * ----------------------------------------------------------------------
   */

  export class Map {
    ID: number
    Obj: google.maps.Map
    Type: string 

    constructor(id:number, obj:google.maps.Map) {
      this.ID = id
      this.Obj = obj
      this.Type = TYPE
    }
  }
}