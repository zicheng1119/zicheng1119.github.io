(function () {
  var data = window.resumeSiteData;

  if (!data) {
 return;
  }

  var currentLang = localStorage.getItem("lang") ||
    (data.meta && data.meta.lang && data.meta.lang.indexOf("zh") === 0 ? "zh" : "en");

  function pick(field) {
    if (field && typeof field === "object" && !Array.isArray(field)) {
      return field[currentLang] || field.en || field.zh || "";
    }
    return field;
  }

  function createLink(link, className) {
    var anchor = document.createElement("a");
    anchor.href = link.href;
    anchor.textContent = pick(link.label);

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
      paragraph.textContent = pick(text);
      parent.appendChild(paragraph);
    });
  }

  function renderMeta(meta) {
    if (!meta) {
      return;
    }

    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    if (meta.title) {
      document.title = pick(meta.title);
    }

    if (meta.description) {
  var descriptionTag = document.querySelector('meta[name="description"]');

      if (descriptionTag) {
        descriptionTag.setAttribute("content", pick(meta.description));
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
      image.alt = pick(profile.photo.alt) || ("Portrait of " + (pick(profile.name) || "site owner"));
      portraitCard.appendChild(image);
    } else if (profile.initials) {
      mark.textContent = profile.initials;
    }

    if (profile.name) {
   name.textContent = pick(profile.name);
    }

    if (profile.role) {
      role.textContent = pick(profile.role);
    }

    if (profile.affiliation) {
   affiliation.textContent = pick(profile.affiliation);
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
      link.textContent = pick(item.label);
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
   kicker.textContent = pick(intro.kicker);
  }

    if (intro.text) {
      text.textContent = pick(intro.text);
    }
  }

  function renderBio(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

 var title = document.createElement("h2");
    title.textContent = pick(section.title);
    wrapper.appendChild(title);

    appendParagraphs(wrapper, section.paragraphs);
    root.appendChild(wrapper);
  }

  function renderUpdates(section, root) {
    var wrapper = document.createElement("section");
    wrapper.id = section.id;
    wrapper.className = "content-section";

    var title = document.createElement("h2");
    title.textContent = pick(section.title);
    wrapper.appendChild(title);

    var list = document.createElement("ul");
    list.className = "news-list";

    (section.items || []).forEach(function (item) {
      var li = document.createElement("li");
      var date = document.createElement("span");
      var text = document.createElement("span");

      date.className = "news-date";
      date.textContent = pick(item.date);
   text.className = "news-text";
    text.textContent = pick(item.text);

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
    title.textContent = pick(section.title);
    wrapper.appendChild(title);

    (section.items || []).forEach(function (item) {
      var article = document.createElement("article");
   article.className = "entry";

  var meta = document.createElement("div");
      meta.className = "entry-meta";
      meta.textContent = pick(item.meta);

      var body = document.createElement("div");
      body.className = "entry-body";

      var heading = document.createElement("h3");
      heading.textContent = pick(item.title);
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
    title.textContent = pick(section.title);
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
      copy.textContent = pick(footer.copy);
    }

    linksRoot.innerHTML = "";

    (footer.links || []).forEach(function (link, index) {
      if (index > 0) {
        linksRoot.appendChild(document.createTextNode(" / "));
      }

 linksRoot.appendChild(createLink(link));
    });
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) {
      return;
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () {
      t.classList.remove("show");
    }, 1600);
  }

  function initTheme() {
    var saved = localStorage.getItem("theme");
    var dark = saved ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");

    var btn = document.getElementById("theme-toggle");
    if (!btn) {
      return;
    }
    btn.addEventListener("click", function () {
 var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", now);
      localStorage.setItem("theme", now);
    });
  }

  function initLang() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) {
    return;
    }
 btn.textContent = currentLang === "zh" ? "EN" : "中";
    btn.addEventListener("click", function () {
    currentLang = currentLang === "zh" ? "en" : "zh";
      localStorage.setItem("lang", currentLang);
  btn.textContent = currentLang === "zh" ? "EN" : "中";
      renderAll();
    });
  }

  function initScrollSpy() {
    var navLinks = {};
    document.querySelectorAll("#profile-nav a").forEach(function (a) {
      navLinks[a.getAttribute("href").slice(1)] = a;
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
    Object.keys(navLinks).forEach(function (id) {
            navLinks[id].classList.remove("active");
          });
          if (navLinks[e.target.id]) {
          navLinks[e.target.id].classList.add("active");
          }
      }
      });
  }, { rootMargin: "-40% 0px -55% 0px" });

    document.querySelectorAll(".content-section").forEach(function (s) {
      obs.observe(s);
    });
  }

  function initCopyEmail() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        if (!navigator.clipboard || !navigator.clipboard.writeText) {
 return;
        }
        e.preventDefault();
  var email = a.getAttribute("href").replace("mailto:", "");
        navigator.clipboard.writeText(email).then(function () {
       toast(currentLang === "zh" ? "邮箱已复制" : "Email copied");
        }).catch(function () {
          window.location.href = a.getAttribute("href");
        });
  });
    });
  }

  function initToTop() {
    var btn = document.getElementById("to-top");
    if (!btn) {
  return;
    }
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 400);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initReveal() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
      e.target.classList.add("in");
        }
  });
    }, { threshold: 0.1 });

    document.querySelectorAll(".content-section").forEach(function (s) {
    s.classList.add("reveal");
      obs.observe(s);
    });
  }

  function renderAll() {
    renderMeta(data.meta);
    renderProfile(data.profile);
    renderLinks(data.links);
    renderNav(data.nav);
    renderIntro(data.intro);
    renderSections(data.sections);
    renderFooter(data.footer);
    initScrollSpy();
 initCopyEmail();
    initReveal();
  }

  renderAll();
  initTheme();
  initLang();
  initToTop();
})();
