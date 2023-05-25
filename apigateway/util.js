const RenameObjKey = (obj, oldkey, newkey) => {
    Object.defineProperty(
      obj,
      newkey,
      Object.getOwnPropertyDescriptor(obj, oldkey)
    );
    delete obj[oldkey];
    return obj;
}

const convertToTraceparent = (traceid, spanid, sampled, w3cversion = '00') => {
  return `${w3cversion}-${traceid}-${spanid}-${sampled ? "01" : "00"}`
}


/**
 * Extracts a value from an object, based on the given key. It will first check if the exact key exists. 
 * If not, then it will check for keys who your key is a substring of (case sensitive), and if still not, it will check again, but case insensitive.
 * If minLength is passed, it will only return the value, if it is of type string, and if the value strings' length is >= than the minLength.
 * @param {Object} obj - The object you want to extract a value from
 * @param {String} key - the key, whose value u want (if the key doesn't exist, it will looks for any key that your key is a substring of)
 * @param {Number} minLength - If given, it is expected that the value is a string. It will only return the string if its' length is >= to this paramter (minLength)
 * @returns 
 */
function GetIfContains(obj, key, minLength) {
  const lowercaseKey = key.toLowerCase();

  // Check if the exact key exists in the object
  if (obj.hasOwnProperty(key)) {
    const value = obj[key];
    return validateAndReturn(value);
  }

  // Check for substring keys (case-sensitive)
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && prop.includes(key)) {
      const value = obj[prop];
      return validateAndReturn(value);
    }
  }

  // Check for substring keys (case-insensitive)
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop) && prop.toLowerCase().includes(lowercaseKey)) {
      const value = obj[prop];
      return validateAndReturn(value);
    }
  }

  // Return default value if no exact or case-insensitive substring match was found
  return obj[key];

  // Validate the value and return accordingly
  function validateAndReturn(value) {
    if (typeof value === 'string') {
      if (minLength === undefined || value.length >= minLength) {
        return value;
      } else {
        throw new Error(`value exists, but length is too short ${value.length}, expected ${minLength}`);
      }
    } else if (minLength === undefined) {
      return value;
    } else {
      throw new Error(`value exists, but is of type ${typeof value}, expected string`);
    }
  }
}




module.exports = {
    RenameObjKey,
    convertToTraceparent,
    GetIfContains
}