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
        Parent: function(){ return $.Polygons[id]; }
      }
      this.Type = _C.Object.Type.POLYGON
    }
  }
}

