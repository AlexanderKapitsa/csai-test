class TwitterUrlValidator {
  static REG_EXP_TO_CHECK_IF_TWITTER_POST_URL = new RegExp(
    /^(?:https?:\/\/)?(www\.)?(twitter|x)\.com\/([a-zA-Z0-9_]+\/(status)\/[0-9]+)$/
  );

  static validate(url) {
    return this.REG_EXP_TO_CHECK_IF_TWITTER_POST_URL.test(url);
  }
}

export default TwitterUrlValidator;
