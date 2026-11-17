class UnexpectedErrorTypeCreator {
  static create(value, expectedType) {
    return new Error(
      `A ${expectedType} is expected, but ${value?.constructor.name ?? typeof value} of value ${value} is provided`
    );
  }
}

export default UnexpectedErrorTypeCreator;
