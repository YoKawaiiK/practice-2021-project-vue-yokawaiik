export const fillModalWindowForEdit = (fieldsModal, fieldsData) => {
  if (typeof fieldsData !== "object") return fieldsData;
  for (const key in fieldsData) {
    // if property includes name as value
    if (key in fieldsModal && typeof fieldsData[key] === "object") {
      fieldsModal[key].value = fieldsData[key].id;
    } else if (key in fieldsModal) {
      // rounding if there are insignificant zeros
      if (!isNaN(fieldsData[key]))
        fieldsModal[key].value = parseInt(fieldsData[key] * 100) / 100;
      else fieldsModal[key].value = fieldsData[key];
    } else if (typeof fieldsData[key] === "object") {
      fieldsModal[key].value = fillModalWindowForEdit(
        fieldsModal,
        fieldsData[key]
      );
    }
  }
  return fieldsModal;
};
