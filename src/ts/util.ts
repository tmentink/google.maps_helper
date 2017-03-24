/// <reference path="obj/objectArray.ts" />
/// <reference path="constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: util.ts 
// ------------------------------------------------------------------------
 
namespace GMH.Util {


  // ------------------------------------------------------------------------
  // Public Functions 
  // ------------------------------------------------------------------------
  
  /**
   * Returns an copy of source object minus the values of exclude 
   * @param source A GMH ObjectArray 
   * @param exclude Can be a comma separated string, an array or an object
   */
  export function copy(source: GMH.Obj.ObjectArray, exclude?: any) {
    // make a deep copy of the source
    const src_copy = jQuery.extend(true, {}, source)
 
    // convert exclude into an array
    if (jQuery.type(exclude) == "object") {
      exclude = Object.keys(exclude)
    }
    else if (jQuery.type(exclude) == "string") {
      exclude = exclude.split(",")
    }

    // get the source's prototype and convert into array
    const src_proto = Object.keys(Object.getPrototypeOf(source));
    
    // merge the src_proto and exclude arrays
    exclude = src_proto.concat(exclude);

    // delete all exclude items from src_copy
    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]]
    }

    // create a new object based on source type
    const GMH_Obj = source.Type ? new GMH.Obj[source.Type] : {}

    // copy into new object 
    return jQuery.extend(GMH_Obj, src_copy)
  }

  /**
   * Returns an array of the object's ids 
   * @param obj A GMH ObjectArray 
   */
  export function getIDs(obj: GMH.Obj.ObjectArray): string[] {
    let ids = Object.keys(obj)

    let _i = ids.indexOf("_i")
    if (_i !== -1) {
      ids.splice(_i, 1)
    }

    return ids
  }

  /**
   * Converts a comma separated string into a LatLng object 
   * @param str A comma separated string of x and y coordinates 
   */
  export function toLatLng(str: any): google.maps.LatLng {  
    const Delimeter = {
      LatLng: Config.Delimeter.LatLng || ","
    }

    const points = str.split(Delimeter.LatLng)
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  /**
   * Converts a custom formatted string into an array of LatLng objects 
   * @param str A custom formatted string of x and y coordinate pairs 
   */
  export function toLatLngArray(str: any): google.maps.LatLng[] {
    const Delimeter = {
      LatLng: Config.Delimeter.LatLng || ",",
      LatLngPair: Config.Delimeter.LatLngPair || "|"
    }

    const latLngArray = []
    const coordPairs = str.split(Delimeter.LatLngPair)

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      let points = coordPairs[i].split(Delimeter.LatLng)
      let latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
      latLngArray.push(latLng)
    }

    return latLngArray;
  }

  /**
   * Returns correct ObjectType constant
   * @param type A string of the object type 
   */
  export function getObjectType(type: string): string {
    type = type.toLowerCase().replace(/\s+/g, '')
    return _C.Object.Alias[type] || type
  }

  /**
   * Returns correct EventType constant
   * @param event A string of the event type 
   */
  export function getEventType(event: string): string {
    event = event.toLowerCase().replace(/\s+/g, '')
    return _C.Event.Alias[event] || event
  }
}

