export const objectKeysCamelCaseToSnakeCase = (obj) => {
  if (typeof obj != "object") return obj;
  let newObj = { ...obj };
  for (let oldName in newObj) {
    // Camel to underscore
    let newName = oldName.replace(/([A-Z])/g, function ($1) {
      return "_" + $1.toLowerCase();
    });

    // Only process if names are different
    if (newName != oldName) {
      // Check for the old property name to avoid a ReferenceError in strict mode.
      if (oldName in newObj) {
        newObj[newName] = newObj[oldName];
        delete newObj[oldName];
      }
    }

    // Recursion
    if (typeof newObj[newName] == "object") {
      newObj[newName] = objectKeysCamelCaseToSnakeCase(newObj[newName]);
    }
  }
  return newObj;
};
