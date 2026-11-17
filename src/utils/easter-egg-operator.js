import LocalStorageOperator from './local-storage-operator.js';

export const EggsKeys = {
  FIRST_VISIT: 'first_visit',
  KONAMI_CODE: 'konami_code',
  DOOM_CODE: 'doom_code',
  OTHER_SECRET: 'other_secret',
};

const LS_KEY = 'service';

const list = [
  {
    points: 5,
    completed: true,
    key: EggsKeys.FIRST_VISIT,
    name: 'Перший візит до сайту',
  },
  {
    points: 10,
    completed: false,
    key: EggsKeys.KONAMI_CODE,
    name: 'Код Конамі',
  },
  {
    points: 15,
    completed: false,
    key: EggsKeys.DOOM_CODE,
    name: 'Спадок Кармака',
  },
];

const ListOperator = (list) => ({
  list,
  completeByKey: function (givenKey) {
    const task = this.list.find(({ key }) => key === givenKey);

    if (typeof task === 'undefined') {
      return;
    }

    task.completed = true;

    return task;
  },
});

const ListSerializationOperator = (list, serializer) => {
  // Init
  const loadedList = serializer.load(LS_KEY);

  let listToLoad;

  if (loadedList === null) {
    serializer.save(list);
    listToLoad = list;
  } else {
    listToLoad = loadedList;
  }

  if (list.length !== loadedList.length) {
    listToLoad = list;
  }

  const listOperator = ListOperator(listToLoad);

  return {
    ...listOperator,
    getByKey: function (givenKey) {
      const task = this.list.find(({ key }) => key === givenKey);

      if (typeof task === 'undefined') {
        return null;
      }

      return task;
    },
    completeByKey: function (givenKey) {
      const task = listOperator.completeByKey(givenKey);

      serializer.save(listOperator.list);

      return task;
    },
  };
};

export const EasterEggOperator = {
  listOperator: ListSerializationOperator(list, LocalStorageOperator(LS_KEY)),
  get completedCount() {
    return this.listOperator.list.filter(({ completed }) => completed === true)
      .length;
  },
  get maxPoints() {
    return this.listOperator.list.reduce((acc, { points }) => acc + points, 0);
  },
  get currentPoints() {
    return this.listOperator.list.reduce(
      (acc, { completed, points }) => (completed ? acc + points : acc),
      0
    );
  },
  get hasFoundAll() {
    return this.maxPoints === this.currentPoints;
  },
  completeByKey: function (givenKey) {
    const originalTask = this.listOperator.getByKey(givenKey);

    if (!originalTask || originalTask.completed === true) {
      return;
    }

    this.listOperator.completeByKey(givenKey);
  },
};
