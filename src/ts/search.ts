// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: search.ts 
// ------------------------------------------------------------------------

namespace GMH {

  import _C = GMH.__gmh__.Constants
  import _D = GMH.__gmh__.Data


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  /**
   * Returns any matching ids for the given object type
   * @param type A string of the object type 
   * @param ids An object id or an array of object ids 
   */
  export function $(type: string, ids: any){
    type = Util.getObjectType(type)
    if (type == _C.Object.Type.MAP) {
      return _D.Map;
    }

    const exclude = getIDsToExclude(type, Util.toArray(ids))
    return Util.copy(_D[type], exclude)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function getIDsToExclude(type: string, ids: any) {
    let exclude
    
    if (ids) {
      const allIDs = _D[type].getIDs()
      exclude = allIDs.filter(function(i){
        return ids.indexOf(i) === -1
      })
    }

    return exclude
  }

}

