export const obj2Arr = (obj: object) => {
  return Object
    .keys(obj)
    .reduce((accumulator, value) => {
      return [
        ...accumulator,
        obj[value],
      ];
    }, []);
}
