interface IStateObj {
  [key: string]: object;
}

export const obj2Arr = (obj: IStateObj): Array<[object]> => {
  return Object
    .keys(obj)
    .reduce((accumulator: any, value: string) => {
      return [
        ...accumulator,
        obj[value],
      ];
    }, []);
};

export const createNotification = () => ({
  android: {
    priority: 'high',
    sound: true,
    sticky: false,
    vibrate: true,
  },
  body: '☝️🤓 don\'t forget to train with flashcards today!',
  ios: {
    sound: true,
  },
  title: 'A great Quiz is awaiting!',
});
