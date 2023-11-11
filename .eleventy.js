/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/favicon.ico");
  eleventyConfig.addWatchTarget("_site/assets/main.css");

  return {
    dir: {
      input: "src",
    },
  };
};
