# 主页美化与功能增强 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保持现有数据驱动架构的前提下，把主页打磨为 A·精炼纸感高级风，并加入暗色切换、滚动高亮导航、复制邮箱+返回顶部、中英文切换四个功能。

**Architecture:** 纯静态 + vanilla JS。样式与暗色主题用 CSS 自定义属性 + `[data-theme]`；内容数据 `site-data.js` 文字字段改为 `{zh,en}`，`render.js` 用 `pick()` 按当前语言取值（纯字符串向后兼容）；交互行为（主题/语言/滚动高亮/复制/返回顶部）全部加在 `render.js`。

**Tech Stack:** HTML / CSS custom properties / vanilla JS / localStorage / IntersectionObserver

**验证方式：** 本项目无测试框架，引入测试框架属过度工程。每个任务以「浏览器手动验证」为准：`open index.html`，按步骤勾验收点。

---

### Task 1: CSS 高级打磨 + 暗色主题

**Files:**
- Modify: `assets/styles.css`

- [ ] **Step 1: 把配色抽到 `:root` 并加暗色覆盖**

在 `:root` 现有变量基础上调整强调色为克制蓝灰，并新增 `[data-theme="dark"]` 暖色暗调覆盖（深炭背景 `#1a1714`、米色文字 `#e9e2d6`、金棕/蓝灰强调）。给 `html` 加 `transition: background-color .3s, color .3s`。

- [ ] **Step 2: 字体层级 / 留白 / 阴影打磨**

收紧标题字距（`letter-spacing`）、优化 `line-height`、加大 `.content-section` 垂直节奏；卡片/头像阴影改为柔和分层阴影。

- [ ] **Step 3: 微交互样式**

链接悬停下划线动画（`background-size` 过渡）、`.entry`/卡片 hover 轻微上移 + 阴影、`:focus-visible` 焦点环；`.nav a.active` 激活态样式（强调色 + 左侧标记）；章节渐入初始态 `.reveal{opacity:0;transform:translateY(12px)}` 与 `.reveal.in{opacity:1;transform:none;transition:.6s}`。

- [ ] **Step 4: 新组件样式**

`.topbar`（右上角主题+语言钮）、`.icon-btn`、`.toast`（底部居中轻提示，淡入淡出）、`.to-top`（右下角圆钮，`opacity` 控制显隐）。

- [ ] **Step 5: 浏览器验证 + 提交**

`open index.html`，确认浅色下版式更精致、无样式破损。
```bash
git add assets/styles.css && git commit -m "style: premium polish + dark theme tokens"
```

---

### Task 2: index.html 挂载点

**Files:**
- Modify: `index.html`

- [ ] **Step 1: 加顶栏控件**

在 `.page-shell` 内最前面加：
```html
<div class="topbar">
  <button class="icon-btn" id="lang-toggle" type="button">EN</button>
  <button class="icon-btn" id="theme-toggle" type="button" aria-label="toggle theme">◐</button>
</div>
```

- [ ] **Step 2: 加返回顶部钮与提示容器**

在 `</body>` 前加：
```html
<button class="to-top" id="to-top" type="button" aria-label="back to top"↑</button>
<div class="toast" id="toast" role="status"></div>
```

- [ ] **Step 3: 验证 + 提交**

`open index.html`，确认控件出现（行为下个任务接）。
```bash
git add index.html && git commit -m "feat: add topbar, back-to-top, toast mount points"
```

---

### Task 3: 主题切换逻辑

**Files:**
- Modify: `assets/render.js`

- [ ] **Step 1: 在 IIFE 内加主题模块**

```js
function initTheme() {
  var saved = localStorage.getItem("theme");
  var dark = saved ? saved === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  var btn = document.getElementById("theme-toggle");
  btn.addEventListener("click", function () {
    var now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", now);
    localStorage.setItem("theme", now);
  });
}
```
在文件末尾调用链里加 `initTheme();`

- [ ] **Step 2: 验证 + 提交**

`open index.html`：点钮切暗/亮，刷新保持；清除 localStorage 后首访跟随系统。
```bash
git add assets/render.js && git commit -m "feat: theme toggle with persistence"
```

---

### Task 4: 中英文双语

**Files:**
- Modify: `assets/render.js`, `editable/site-data.js`

- [ ] **Step 1: render.js 加 `pick` 与当前语言状态**

```js
var currentLang = localStorage.getItem("lang") || (data.meta && data.meta.lang && data.meta.lang.indexOf("zh") === 0 ? "zh" : "en");
function pick(field) {
  if (field && typeof field === "object" && !Array.isArray(field)) {
    return field[currentLang] || field.en || field.zh || "";
  }
  return field;
}
```
把渲染函数里所有取文字处用 `pick(...)` 包裹（`name/role/affiliation`、link `label`、nav `label`、intro `kicker/text`、section `title`、paragraphs 每项、updates `text`、work `meta/title/description`、footer `copy`）。`paragraphs` 用 `(section.paragraphs||[]).map(pick)`。

- [ ] **Step 2: 加语言切换逻辑**

```js
function initLang() {
  var btn = document.getElementById("lang-toggle");
  btn.textContent = currentLang === "zh" ? "EN" : "中";
  btn.addEventListener("click", function () {
    currentLang = currentLang === "zh" ? "en" : "zh";
    localStorage.setItem("lang", currentLang);
    btn.textContent = currentLang === "zh" ? "EN" : "中";
    renderAll();
  });
}
```
把现有 7 个 render 调用收进 `function renderAll(){...}`（meta/profile/links/nav/intro/sections/footer），末尾调用 `renderAll(); initTheme(); initLang();`。

- [ ] **Step 3: site-data.js 文字字段改双语 + 中文初稿**

把每个文字字段从字符串改成 `{ zh: "中文初稿", en: "原英文" }`（meta.title 可保留英文名）。逐字段补中文译文。

- [ ] **Step 4: 验证 + 提交**

`open index.html`：切换语言全文切换、刷新保持；故意留一个纯字符串字段确认仍正常（向后兼容）。
```bash
git add assets/render.js editable/site-data.js && git commit -m "feat: bilingual zh/en toggle"
```

---

### Task 5: 滚动高亮 + 复制邮箱 + 返回顶部 + 渐入

**Files:**
- Modify: `assets/render.js`

- [ ] **Step 1: 滚动高亮导航**

```js
function initScrollSpy() {
  var navLinks = {};
  document.querySelectorAll("#profile-nav a").forEach(function (a) {
    navLinks[a.getAttribute("href").slice(1)] = a;
  });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        Object.values(navLinks).forEach(function (a) { a.classList.remove("active"); });
        if (navLinks[e.target.id]) navLinks[e.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll(".content-section").forEach(function (s) { obs.observe(s); });
}
```

- [ ] **Step 2: 复制邮箱 + 轻提示**

```js
function toast(msg) {
  var t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  setTimeout(function () { t.classList.remove("show"); }, 1600);
}
function initCopyEmail() {
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var email = a.getAttribute("href").replace("mailto:", "");
      navigator.clipboard.writeText(email).then(function () {
        toast(currentLang === "zh" ? "邮箱已复制" : "Email copied");
      });
    });
  });
}
```

- [ ] **Step 3: 返回顶部**

```js
function initToTop() {
  var btn = document.getElementById("to-top");
  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  btn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
}
```

- [ ] **Step 4: 章节渐入**

```js
function initReveal() {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".content-section").forEach(function (s) {
    s.classList.add("reveal"); obs.observe(s);
  });
}
```

- [ ] **Step 5: 接线**

这些依赖 DOM，需在每次 `renderAll()` 后调用与内容相关的（scrollSpy/copyEmail/reveal 依赖重渲染的节点）。在 `renderAll()` 末尾加 `initScrollSpy(); initCopyEmail(); initReveal();`；`initToTop()` 只需一次，放最外层调用。

- [ ] **Step 6: 验证 + 提交**

`open index.html`：滚动时导航高亮跟随；点邮箱复制并出现提示；下滚 400px 后返回顶部钮出现、点击平滑回顶；章节滚入渐显；切到窄屏（<920px）布局不破。
```bash
git add assets/render.js && git commit -m "feat: scroll-spy, copy-email, back-to-top, reveal"
```

---

## Self-Review

- **Spec coverage:** 视觉打磨→Task1；暗色切换→Task1+3；中英文→Task4；滚动高亮→Task5.1；复制邮箱+返回顶部→Task5.2/5.3；微交互渐入→Task1.3+5.4。全覆盖。
- **Placeholder:** 无 TBD；关键逻辑均给出完整代码；CSS 打磨为风格描述（合理，按风格执行）。
- **类型一致:** `pick`、`renderAll`、`toast`、各 `init*` 命名在任务间一致；`.active`/`.reveal/.in`/`.show` class 名 CSS 与 JS 对应。
