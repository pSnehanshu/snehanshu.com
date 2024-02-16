const htmlmin = require("html-minifier");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/favicon.ico");
  eleventyConfig.addPassthroughCopy("./src/assets/media");
  eleventyConfig.addWatchTarget("_site/assets/main.css");

  eleventyConfig.addTransform("htmlmin", function (content) {
    // Prior to Eleventy 2.0: use this.outputPath instead
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        quoteCharacter: "'",
        maxLineLength: 200,
        minifyJS: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addShortcode("post_url", function (post_url) {
    return `/blog/${post_url}`;
  });

  eleventyConfig.addShortcode("post_media_url", function (file_name) {
    return `/assets/media/post-media/${file_name}`;
  });

  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  });

  return {
    dir: {
      input: "src",
    },
  };
};
