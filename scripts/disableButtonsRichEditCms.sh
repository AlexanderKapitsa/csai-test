cat >> ./dist/admin/index.html << EOF
<style>
  .tina-prose > span > span:has(h1),
  .tina-prose > span > span:has(h3),
  .tina-prose > span > span:has(h4),
  .tina-prose > span > span:has(h5),
  .tina-prose > span > span:has(h6) {
    display: none;
  }

  span:has([data-test="imageButton"]),
  [data-test="boldButton"],
  [data-test="italicButton"] {
    display: none;
  }
</style>

EOF
