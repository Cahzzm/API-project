export const normalizeArray = array => {
    const newObj = {};

    if (array) {
      array.forEach(item => {
        newObj[item.id] = item;
      });
    }

    return newObj;
  };
