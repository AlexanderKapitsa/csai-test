const Counter = () => {
  let count = 0;

  return {
    value: count,
    increment: () => {
      count += 1;
      return count;
    },
  };
};

export default Counter;
