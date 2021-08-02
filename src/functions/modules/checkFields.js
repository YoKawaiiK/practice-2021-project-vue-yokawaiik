// check all fields in object
export default (object) => {
  return Object.values(object).every((value) => value);
};
