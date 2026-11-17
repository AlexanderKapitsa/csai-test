class BaseUrlValidator {
  static validate(url, regExp) {
    if (typeof url !== 'string') {
      throw new Error(`A url of type string is expected, but ${typeof url} is provided`);
    }

    const validationResult = regExp.test(url);
    const isValidationSuccessful = validationResult === true;

    return isValidationSuccessful;
  }
}

export default BaseUrlValidator;
