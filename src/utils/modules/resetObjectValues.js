export const resetObjectValues = (object) => {
  for (const key in object) {
    if (key in object) {
      if (typeof object[key] === "string") {
        object[key] = "";
      } else if (typeof object[key] === "boolean") {
        object[key] = false;
      } else if (typeof object[key] instanceof Array) {
        object[key] = [];
      } else if (typeof object[key] instanceof Object) {
        object[key] = {};
      }
    }
  }
};
