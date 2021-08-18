export const modalWindowCollectorData = (object, neededProperties) => {
  let data = {};
  for (const field in object) {
    for (const key in object[field]) {
      if (neededProperties.includes(key)) data[field] = object[field][key];
    }
  }
  return data;
};
