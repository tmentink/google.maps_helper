/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker {
    ID: string
    Init: {
      Options: google.maps.MarkerOptions
    }
    Obj: google.maps.Marker
    Type: string 

    constructor(id: string, options: google.maps.MarkerOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new google.maps.Marker(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Marker[id] }
      }
      this.Type = _C.Object.Type.MARKER
    }
  }

}

