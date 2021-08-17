export const objectKeysSnakeCaseToCamelCase = (obj) => {
  if (typeof obj != "object") return obj;
  return JSON.parse(
    JSON.stringify(obj)
      .trim()
      .replace(/("\w+":)/g, function (keys) {
        return keys.replace(/(.(_|-|\s)+.)/g, function (subStr) {
          return subStr[0] + subStr[subStr.length - 1].toUpperCase();
        });
      })
  );
};
