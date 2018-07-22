interface StateObj {
  [key:string]: Object,
}

export const obj2Arr = (obj: StateObj): Array<[Object]> => {
  return Object
    .keys(obj)
    .reduce((accumulator: any, value: string) => {
      return [
        ...accumulator,
        obj[value],
      ];
    }, []);
}
