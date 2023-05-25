export class Arr {
    static get(obj, pathToKey, defaultValue = null, checkForEmpty = true) {
      const keys = pathToKey.split('.');
      let value = obj;
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key];
        } else {
          return defaultValue;
        }
      }
  
      if (checkForEmpty && (value === undefined || value === null || value === '')) {
        return defaultValue;
      }
  
      return value;
    }
  
    static set(obj, pathToKey, value) {
      const keys = pathToKey.split('.');
      let current = obj;
  
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current && typeof current === 'object') {
          if (!(key in current)) {
            if (!isNaN(keys[i + 1])) {
              current[key] = [];
            } else {
              current[key] = {};
            }
          }
          current = current[key];
        } else {
          return obj;
        }
      }
  
      current[keys[keys.length - 1]] = value;
      return obj;
    }
  
    static delete(obj, pathToKey) {
      const keys = pathToKey.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          return obj;
        }
      }
  
      const lastKey = keys[keys.length - 1];
      if (Array.isArray(current) && !isNaN(lastKey)) {
        current.splice(lastKey, 1);
      } else if (current && typeof current === 'object' && lastKey in current) {
        delete current[lastKey];
      }
  
      return obj;
    }
  
    static rename(obj, pathToKey, newName) {
      const keys = pathToKey.split('.');
      let current = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          console.log(`Key doesn't exist in path ${pathToKey}. No changes.`);
          return obj;
        }
      }
  
      const lastKey = keys[keys.length - 1];
      if (current && typeof current === 'object' && lastKey in current) {
        if (current[newName] !== undefined) {
          throw new Error(`${newName} key already exists at path ${pathToKey}. Cannot perform rename.`);
        }
  
        current[newName] = current[lastKey];
        delete current[lastKey];
      }
  
      return obj;
    }
  }