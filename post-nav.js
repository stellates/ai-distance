(() => {
  const navigation = document.querySelector("[data-post-nav]");

  if (!navigation) {
    return;
  }

  const currentId = getCurrentArticleId();

  if (!currentId) {
    return;
  }

  fetch("../data/posts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`posts.json could not be loaded: ${response.status}`);
      }

      return response.json();
    })
    .then((posts) => {
      if (!Array.isArray(posts)) {
        throw new Error("posts.json must contain an array");
      }

      const articles = posts.map(normalizeArticle).filter(Boolean);
      const currentIndex = articles.findIndex((article) => article.id === currentId);

      if (currentIndex === -1) {
        return;
      }

      // posts.json is ordered from the newest article to the oldest article.
      setArticleLink(
        navigation.querySelector("[data-post-nav-previous]"),
        articles[currentIndex + 1],
      );
      setArticleLink(
        navigation.querySelector("[data-post-nav-next]"),
        articles[currentIndex - 1],
      );
    })
    .catch(() => {
      // Keep the static archive link and disabled navigation when loading fails.
    });

  function getCurrentArticleId() {
    const filename = decodeURIComponent(window.location.pathname.split("/").pop() || "");
    const match = filename.match(/^(\d+)(?:-[^/]+)?\.html$/i);

    return match ? match[1].padStart(3, "0") : null;
  }

  function normalizeArticle(article) {
    if (!article || typeof article !== "object") {
      return null;
    }

    const rawId = article.no ?? article.id;
    const id = String(rawId ?? "").trim();

    if (!/^\d+$/.test(id)) {
      return null;
    }

    return {
      id: id.padStart(3, "0"),
    };
  }

  function setArticleLink(target, article) {
    if (!target || !article) {
      return;
    }

    const link = document.createElement("a");
    link.className = target.className.replace(/\bis-disabled\b/g, "").trim();
    link.href = `./${article.id}.html`;
    link.textContent = target.textContent;
    target.replaceWith(link);
  }
})();
