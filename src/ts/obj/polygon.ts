/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Polygon {
    ID: string
    Init: {
      Options: google.maps.PolygonOptions
    }
    Obj: google.maps.Polygon
    Type: string 

    constructor(id: string, options: google.maps.PolygonOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new google.maps.Polygon(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Polygon[id] }
      }
      this.Type = _C.Object.Type.POLYGON
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public getBounds() {
      return GMH.Polygon.getBounds(this.ID)
    }

    public getCenter() {
      return GMH.Polygon.getCenter(this.ID)
    }

    public reset() {
      return GMH.Polygon.reset(this.ID)
    }

    public update(options: google.maps.PolygonOptions) {
      return GMH.Polygon.update(this.ID, options)
    }
  }

}

