// change field.error in fields

export const formValidator = (fields) => {
  let countErrors = 0;
  for (let field of fields) {
    // clear error
    field.errors = [];

    // length check
    if (
      field.value.length === 0 &&
      ["text", "password", "email"].includes(field.type)
    ) {
      field.errors.push("Поле пустое.");
      countErrors++;
      continue;
    }

    if (
      field.type === "password" &&
      field.value.length < 5 &&
      field.value.length > 20
    ) {
      field.errors.push(
        "Значение не должно быть больше 20 и меньше 5 символов."
      );
      countErrors++;
      continue;
    }

    if (
      field.type === "text" &&
      field.value.length > 45 &&
      field.value.length < 5
    ) {
      field.errors.push(
        "Значение не должно быть больше 45 и меньше 5 символов."
      );
      countErrors++;
      continue;
    }
    // email check
    if (
      field.type === "email" &&
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(field.value) ===
        false
    ) {
      field.errors.push("Введен некоректный email.");
      countErrors++;
      continue;
    }

    // checkbox check
    if (field.type === "checkbox" && field.required && field.value === false) {
      field.errors.push("Необходимо установить голочку.");
      countErrors++;
      continue;
    }
  }
  return countErrors === 0;
};
