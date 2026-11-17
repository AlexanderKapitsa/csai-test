class YouTubeUrlValidator {
  static REG_EXP_TO_CHECK_IF_YOUTUBE_VIDEO_URL = new RegExp(
    /^(?:https?:\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/|e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)([\w-]{11})[\?&#]?\S*$/
  );

  static validate(url) {
    return this.REG_EXP_TO_CHECK_IF_YOUTUBE_VIDEO_URL.test(url);
  }
}

export default YouTubeUrlValidator;
