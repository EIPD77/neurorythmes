import rssPlugin from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // Copy assets through without processing
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Draft/status filter: show only published in production
  eleventyConfig.addGlobalData("eleventyComputed", {
    eleventyExcludeFromCollections: (data) => {
      const status = data.status || "published";
      const isProd = process.env.NODE_ENV === "production";
      return isProd ? status !== "published" : false;
    }
  });

  // Collections
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  // Date helper (simple)
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    new Intl.DateTimeFormat("en-UK", { dateStyle: "long" }).format(dateObj)
  );

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes/"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}