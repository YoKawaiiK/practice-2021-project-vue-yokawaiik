// check all fields in object
export default (object) => {
  for (const key in object) {
    if (typeof object[key] == undefined) return false;
    if (object[key] == false) return false;
  }
  return true;
};
