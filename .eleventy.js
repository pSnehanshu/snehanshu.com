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
    return `/blog/${post_url}/`;
  });

  eleventyConfig.addShortcode("post_media_url", function (file_name) {
    return `/assets/media/post-media/${file_name}`;
  });

  eleventyConfig.addShortcode("funny_day", function (date) {
    if (!(date instanceof Date)) {
      throw new TypeError("funny_day only accepts dates");
    }

    const day = date.getDay();

    switch (day) {
      case 0:
        return "Sunny Sunday";
      case 1:
        return "Mighty Monday";
      case 2:
        return "Troublesome Tuesday";
      case 3:
        return "Windy Wednesday";
      case 4:
        return "Thirsty Thursday";
      case 5:
        return "Friendly Friday";
      case 6:
        return "Sexy Saturday";
    }
  });

  eleventyConfig.setLiquidOptions({
    jsTruthy: true,
  });

  // eleventyConfig.addShortcode(
  //   "prev_post",
  //   function (currentPostSlug, allPosts) {
  //     const currentPostIndex = allPosts.findIndex(
  //       (p) => p.fileSlug === currentPostSlug,
  //     );

  //     if (currentPostIndex < 0) {
  //       throw new Error(
  //         `${currentPostSlug} wan't found in the posts collection`,
  //       );
  //     }

  //     if (currentPostIndex === 0) {
  //       return "";
  //     }

  //     const prevPost = allPosts.at(currentPostIndex - 1);

  //     if (prevPost) {
  //       return `<a href="${prevPost.url}">${prevPost.data.title}</a>`;
  //     }

  //     return "";
  //   },
  // );

  // eleventyConfig.addShortcode(
  //   "next_post",
  //   function (currentPostSlug, allPosts) {
  //     const currentPostIndex = allPosts.findIndex(
  //       (p) => p.fileSlug === currentPostSlug,
  //     );

  //     if (currentPostIndex < 0) {
  //       throw new Error(
  //         `${currentPostSlug} wan't found in the posts collection`,
  //       );
  //     }

  //     const prevPost = allPosts.at(currentPostIndex + 1);

  //     if (prevPost) {
  //       return `<a href="${prevPost.url}">${prevPost.data.title}</a>`;
  //     }

  //     return "";
  //   },
  // );

  return {
    dir: {
      input: "src",
    },
  };
};
