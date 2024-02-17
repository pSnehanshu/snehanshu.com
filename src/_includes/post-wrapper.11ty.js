class PostFooter {
  data() {
    return {
      layout: "layout.html",
    };
  }

  render(data) {
    let links = "";

    const prevPost = this.getPrevPost(
      data.page.fileSlug,
      data.collections.post,
    );
    const nextPost = this.getNextPost(
      data.page.fileSlug,
      data.collections.post,
    );

    const linkClass = "underline hover:text-blue-600";

    if (prevPost) {
      links += `<li>Previous post <a class="${linkClass}" href="${prevPost.url}">${prevPost.data.title}</a></li>`;
    }

    if (nextPost) {
      links += `<li>Next post <a class="${linkClass}" href="${nextPost.url}">${nextPost.data.title}</a></li>`;
    }

    links += `<li>📞 <a class="${linkClass}" href="javascript:void(0)" data-cal-link="p-snehanshu/15min" data-cal-config='{"layout":"month_view"}'>Book a consultation</a></li>`;

    return `${data.content} <div class="flex justify-center border-t-2 pt-4 my-8"><ul class="list-disc">${links}</ul></div>`;
  }

  getPrevPost(currentPostSlug, allPosts) {
    const currentPostIndex = allPosts.findIndex(
      (p) => p.fileSlug === currentPostSlug,
    );

    if (currentPostIndex < 0) {
      throw new Error(`${currentPostSlug} wan't found in the posts collection`);
    }

    if (currentPostIndex === 0) {
      return undefined;
    }

    return allPosts.at(currentPostIndex - 1);
  }

  getNextPost(currentPostSlug, allPosts) {
    const currentPostIndex = allPosts.findIndex(
      (p) => p.fileSlug === currentPostSlug,
    );

    if (currentPostIndex < 0) {
      throw new Error(`${currentPostSlug} wan't found in the posts collection`);
    }

    return allPosts.at(currentPostIndex + 1);
  }
}

module.exports = PostFooter;
