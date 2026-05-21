(function () {
  var data = window.resumeSiteData;

  if (!data) {
    return;
  }

  function createLink(link, className) {
    var anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = link.label;

    if (link.external) {
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
    }

    if (className) {
      anchor.className = className;
    }

    return anchor;
  }

  function appendParagraphs(parent, paragraphs) {
    (paragraphs || []).forEach(function (text) {
      var paragraph = document.createElement("p");
      paragraph.textContent = text;
      parent.appendChild(paragraph);
    });
  }

  function renderMeta(meta) {
    if (!meta) {
      return;
    }

    if (meta.lang) {
      document.documentElement.lang = meta.lang;
    }

    if (meta.title) {
      document.title = meta.title;
    }

    if (meta.description) {
      var descriptionTag = document.querySelector('meta[name="description"]');

      if (descriptionTag) {
        descriptionTag.setAttribute("content", meta.description);
      }
    }
  }

  function renderProfile(profile) {
    if (!profile) {
      return;
    }

    var portraitCard = document.getElementById("portrait-card");
    var mark = document.getElementById("portrait-mark");
    var name = document.getElementById("profile-name");
    var role = document.getElementById("profile-role");
    var affiliation = document.getElementById("profile-affiliation");

    if (profile.photo && profile.photo.src) {
      portraitCard.innerHTML = "";

      var image = document.createElement("img");
      image.className = "portrait-image";
      image.src = profile.photo.src;
      image.alt = profile.photo.alt || ("Portrait of " + (profile.name || "site owner"));
      portraitCard.appendChild(image);
    } else if (profile.initials) {
      mark.textContent = profile.initials;
    }

    if (profile.name) {
      name.textContent = profile.name;
    }

    if (profile.role) {
      role.textContent = profile.role;
    }

    if (profile.affiliation) {
      affiliation.textContent = profile.affiliation;
    }
  }

  function renderLinks(links) {
    var linksRoot = document.getElementById("profile-links");
    linksRoot.innerHTML = "";

    (links || []).forEach(function (link) {
      linksRoot.appendChild(createLink(link));
    });
  }

  function renderNav(nav) {
    var navRoot = document.getElementById("profile-nav");
    navRoot.innerHTML = "";

    (nav || []).forEach(function (item) {
      var link = document.createElement("a");
      link.href = "#" + item.id;
      link.textContent = item.label;
      navRoot.appendChild(link);
    });
  }

  function renderIntro(intro) {
    if (!intro) {
      return;
    }

    var kicker = document.getElementById("intro-kicker");
    var text = document.getElementById("intro-text");

    if (intro.kicker) {
      kicker.textContent = intro.kicker;
    }

    if (intro.text) {
      text.textContent = intro.text;
    }
  }

  function renderBio(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

    var title = document.createElement("h2");
    title.textContent = section.title;
    wrapper.appendChild(title);

    appendParagraphs(wrapper, section.paragraphs);
    root.appendChild(wrapper);
  }

  function renderUpdates(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

    var title = document.createElement("h2");
    title.textContent = section.title;
    wrapper.appendChild(title);

    var list = document.createElement("ul");
    list.className = "news-list";

    (section.items || []).forEach(function (item) {
      var li = document.createElement("li");
      var date = document.createElement("span");
      var text = document.createElement("span");

      date.className = "news-date";
      date.textContent = item.date;
      text.className = "news-text";
      text.textContent = item.text;

      li.appendChild(date);
      li.appendChild(text);
      list.appendChild(li);
    });

    wrapper.appendChild(list);
    root.appendChild(wrapper);
  }

  function renderWork(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

    var title = document.createElement("h2");
    title.textContent = section.title;
    wrapper.appendChild(title);

    (section.items || []).forEach(function (item) {
      var article = document.createElement("article");
      article.className = "entry";

      var meta = document.createElement("div");
      meta.className = "entry-meta";
      meta.textContent = item.meta;

      var body = document.createElement("div");
      body.className = "entry-body";

      var heading = document.createElement("h3");
      heading.textContent = item.title;
      body.appendChild(heading);

      appendParagraphs(body, [item.description]);

      if (item.links && item.links.length > 0) {
        var links = document.createElement("div");
        links.className = "entry-links";

        item.links.forEach(function (link) {
          links.appendChild(createLink(link));
        });

        body.appendChild(links);
      }

      article.appendChild(meta);
      article.appendChild(body);
      wrapper.appendChild(article);
    });

    root.appendChild(wrapper);
  }

  function renderRichTextSection(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

    var title = document.createElement("h2");
    title.textContent = section.title;
    wrapper.appendChild(title);

    appendParagraphs(wrapper, section.paragraphs);

    if (section.links && section.links.length > 0) {
      var links = document.createElement("p");

      section.links.forEach(function (link, index) {
        if (index > 0) {
          links.appendChild(document.createTextNode(" / "));
        }

        links.appendChild(createLink(link));
      });

      wrapper.appendChild(links);
    }

    root.appendChild(wrapper);
  }

  function renderSections(sections) {
    var root = document.getElementById("content-sections");
    root.innerHTML = "";

    (sections || []).forEach(function (section) {
      if (section.type === "bio") {
        renderBio(section, root);
        return;
      }

      if (section.type === "updates") {
        renderUpdates(section, root);
        return;
      }

      if (section.type === "work") {
        renderWork(section, root);
        return;
      }

      renderRichTextSection(section, root);
    });
  }

  function renderFooter(footer) {
    if (!footer) {
      return;
    }

    var copy = document.getElementById("footer-copy");
    var linksRoot = document.getElementById("footer-links");

    if (footer.copy) {
      copy.textContent = footer.copy;
    }

    linksRoot.innerHTML = "";

    (footer.links || []).forEach(function (link, index) {
      if (index > 0) {
        linksRoot.appendChild(document.createTextNode(" / "));
      }

      linksRoot.appendChild(createLink(link));
    });
  }

  renderMeta(data.meta);
  renderProfile(data.profile);
  renderLinks(data.links);
  renderNav(data.nav);
  renderIntro(data.intro);
  renderSections(data.sections);
  renderFooter(data.footer);
})();
