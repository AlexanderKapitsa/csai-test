class InstagramUrlValidator {
  static REG_EXP_TO_EXTRACT_POST_ID = new RegExp(
    /^(?:https?:\/\/)?(www\.)?instagram\.com\S*?\/([a-z]+)\/(\w{11})\/?/
  );

  static validate(url) {
    return this.REG_EXP_TO_EXTRACT_POST_ID.test(url);
  }
}

export default InstagramUrlValidator;
