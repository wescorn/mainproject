const RenameObjKey = (obj, oldkey, newkey) => {
    Object.defineProperty(
      obj,
      newkey,
      Object.getOwnPropertyDescriptor(obj, oldkey)
    );
    delete obj[oldkey];
    return obj;
}

module.exports = {
    RenameObjKey
}