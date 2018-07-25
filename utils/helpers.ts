interface StateObj {
  [key: string]: Object,
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

export const createNotification = () => ({
  title: 'A great Quiz is awaiting!',
  body: "☝️🤓 don't forget to train with flashcards today!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  }
});
