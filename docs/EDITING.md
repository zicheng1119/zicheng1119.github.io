# 简历页面编辑指南

本文档说明如何维护和自定义根站点：

- `https://zicheng1119.github.io/`

此仓库刻意保持简单。整个站点仅由几个部分组成：

- `editable/site-data.js`：主要内容源，应优先编辑此文件
- `editable/overrides.css`：你的个人 CSS 覆盖文件
- `index.html`：页面结构和渲染外壳
- `assets/styles.css`：基础颜色、布局、排版、间距和响应式行为
- `assets/render.js`：将 `editable/site-data.js` 渲染为可见页面
- `.github/workflows/pages.yaml`：自动部署到 GitHub Pages

如果你想修改简历页面，大多数时候只需要编辑 `editable/` 目录下的文件。

## 1. 仓库结构

```text
zicheng1119.github.io/
├── .github/workflows/pages.yaml
├── assets/
│   ├── render.js
│   └── styles.css
├── docs/
│   └── EDITING.md
├── editable/
│   ├── images/
│   │   └── README.md
│   ├── overrides.css
│   ├── README.md
│   └── site-data.js
├── index.html
└── README.md
```

## 1.1 你应该按什么顺序编辑

按以下顺序操作：

1. `editable/site-data.js`
2. `editable/overrides.css`
3. `assets/styles.css`
4. `index.html`

正常情况下，你很少需要用到第 3 步和第 4 步。

## 2. 日常工作流

### 本地预览

在仓库根目录下：

```bash
cd /Users/zhouzicheng/Desktop/zicheng1119.github.io
python3 -m http.server 4173
```

然后打开：

- `http://localhost:4173/`

### 发布更改

编辑完成后：

```bash
git add .
git commit -m "更新简历页面"
git push
```

GitHub Actions 将自动部署到：

- `https://zicheng1119.github.io/`

## 3. 常见任务的编辑方法

### 修改姓名

编辑 `editable/site-data.js` 中的以下位置：

- `meta.title`
- `profile.name`
- `profile.initials`

当前示例：

- `title: "Zicheng Zhou"`
- `name: "Zicheng Zhou"`
- `initials: "ZZ"`

### 修改一行身份描述

编辑：

- `profile.role`
- `profile.affiliation`

用于填写：

- 研究员 / 工程师 / 设计师
- 学校 / 实验室 / 公司
- 城市 / 远程

### 修改邮箱和社交链接

编辑以下内容中的链接：

- `links: []`

常见项目：

- 邮箱
- GitHub
- 博客
- LinkedIn
- Google Scholar
- X / Twitter

示例：

```js
links: [
  { label: "your@email.com", href: "mailto:your@email.com", external: false },
  { label: "GitHub", href: "https://github.com/your-id", external: true },
  { label: "博客", href: "https://your-blog.example.com/", external: false }
]
```

### 修改左侧章节列表

编辑以下内容中的章节列表：

- `nav: []`

每个链接需与右侧的章节 `id` 匹配。

示例：

```js
nav: [
  { id: "bio", label: "个人简介" }
]
```

必须与以下章节匹配：

```js
sections: [
  { type: "bio", id: "bio", title: "个人简介", paragraphs: [...] }
]
```

如果不匹配，左侧导航将无法滚动到正确的章节。

## 4. 页面的组织方式

页面采用两栏布局：

- 左栏：身份信息、链接、章节导航
- 右栏：实际简历内容

主容器：

```html
<div class="page-shell">
  <aside class="profile-column">...</aside>
  <main class="content-column">...</main>
</div>
```

如果要添加新内容，几乎总是将其添加到 `editable/site-data.js` 中。

## 5. 如何编辑每个章节

### 简介块

文件：

- `editable/site-data.js`

块：

- `intro`

用途：

- 一段简短的个人概述
- 一句话定位陈述
- 一句说明主页与博客区别的话

### 个人简介

块：

- `sections` 中 `type: "bio"` 的条目

用途：

- 背景
- 研究或专业兴趣
- 当前关注点
- 你从事的工作类型

推荐风格：

- 2 到 4 个短段落
- 每个段落聚焦一个主题
- 避免写成完整简历的感觉

### 动态更新

块：

- `sections` 中 `type: "updates"` 的条目

每个条目包含两部分：

- `.news-date`
- `.news-text`

示例：

```js
items: [
  { date: "2026-05", text: "开始了关于……的新项目" }
]
```

适用场景：

- 论文被接收
- 实习
- 项目启动
- 获奖
- 演讲活动
- 工作上的最新动态

### 精选作品

块：

- `sections` 中 `type: "work"` 的条目

每个项目使用一个 `items` 条目。

结构：

```js
{
  meta: "类别",
  title: "项目名称",
  description: "项目描述",
  links: [
    { label: "访问", href: "https://example.com", external: true },
    { label: "源码", href: "https://github.com/example", external: true }
  ]
}
```

适合放的内容：

- 产品
- 论文
- 开源项目
- 实习经历
- 设计案例
- 学术项目

最佳实践：

- 项目描述控制在 2 到 4 行
- 以成果为导向，而非过程
- 尽可能包含链接

### 写作

块：

- `sections` 中 `type: "text"` 且 `id: "writing"` 的条目

这通常是通往你博客的桥梁。你可以：

- 保留一个短段落和一个链接
- 添加精选文章列表
- 将写作分为技术类和非技术类

### 联系方式

块：

- `sections` 中 `type: "text"` 且 `id: "contact"` 的条目

推荐选项：

- 邮箱
- GitHub
- LinkedIn
- Google Scholar
- CV PDF

如果添加外部链接，请保持 `target="_blank"` 和 `rel="noreferrer"` 以确保安全和一致性。

## 6. 添加全新章节

如果你想添加一个新章节，如"经历"、"出版物"或"教学"，请做以下两件事。

### 第 1 步：在左侧添加导航项

在 `nav` 中：

```js
{ id: "experience", label: "经历" }
```

### 第 2 步：在右侧添加匹配的章节

在 `sections` 中：

```js
{
  type: "text",
  id: "experience",
  title: "经历",
  paragraphs: ["在此处填写你的内容。"]
}
```

这样就足够让新章节正常工作了。

## 7. 用真实照片替换首字母块

目前顶部视觉元素由以下内容控制：

```js
profile: {
  initials: "ZZ"
}
```

如果你想使用真实的个人照片：

### 第 1 步：添加图片文件

将文件放在：

- `editable/images/portrait.jpg`

或：

- `editable/images/portrait.png`

### 第 2 步：取消 `editable/site-data.js` 中 `photo` 块的注释

使用：

```js
photo: {
  src: "./editable/images/portrait.jpg",
  alt: "你的名字的头像"
}
```

### 第 3 步：预览并根据需要调整

如果你希望图片显示更多面部、减少裁剪，可以调整 `assets/styles.css` 中的 `.portrait-image`，或在 `editable/overrides.css` 中添加覆盖样式。

## 8. 修改颜色

所有主要颜色定义在 `assets/styles.css` 顶部的 `:root` 中。

当前变量：

```css
:root {
  --page-bg: #f4f1ea;
  --paper: #fcfbf7;
  --ink: #171717;
  --muted: #666154;
  --line: rgba(23, 23, 23, 0.12);
  --accent: #2b5d94;
  --accent-soft: rgba(43, 93, 148, 0.08);
  --shadow: 0 18px 40px rgba(34, 28, 18, 0.06);
  --max-width: 1160px;
}
```

各变量控制的内容：

- `--page-bg`：整体页面背景
- `--paper`：较浅的表面色调（用于后续添加卡片或面板时）
- `--ink`：主要文字颜色
- `--muted`：次要文字颜色
- `--line`：边框和分隔线
- `--accent`：链接和高亮
- `--accent-soft`：柔和的高亮背景
- `--shadow`：盒子阴影

如果你想换一种风格：

- 温暖的学术风格：略微米黄背景 + 海军蓝强调色
- 简洁极简风格：白色背景 + 灰色文字 + 深色强调色
- 编辑风格：奶油色背景 + 深棕或森林绿强调色

## 9. 修改字体

字体在 `index.html` 中通过以下方式加载：

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Instrument+Sans:wght@400;500;600;700&display=swap">
```

并在 `assets/styles.css` 中使用：

- 正文使用 `"Instrument Sans", sans-serif`
- 标题和大号文字使用 `"Crimson Text", serif`

如果更换字体：

1. 更新 Google Fonts 的 URL
2. 更新 CSS 中对应的 `font-family` 声明

推荐原则：

- 一种衬线字体用于标题和长篇氛围
- 一种无衬线字体用于导航和 UI

## 10. 修改间距和页面宽度

主要布局值在 `assets/styles.css` 中。

重要的选择器：

- `.page-shell`
- `.content-section`
- `.intro-block`
- `.entry`

最实用的设置：

- `--max-width`：整体页面宽度
- `.page-shell` 上的 `grid-template-columns`：左右栏比例
- `gap`：列与块之间的间距
- `padding`：章节的留白空间

示例：

- 加宽左栏：
  - 将 `.page-shell` 从 `300px minmax(0, 1fr)` 改为 `340px minmax(0, 1fr)`
- 让页面更紧凑：
  - 减小 `48px`、`34px`、`30px` 等内边距
- 缩小文字区域宽度：
  - 减小 `.content-section p` 上的 `max-width`

## 11. 移动端适配

响应式规则在 `assets/styles.css` 底部：

```css
@media (max-width: 920px) {
  ...
}
```

此部分控制：

- 双栏布局何时变为单栏
- 粘性侧边栏行为
- 移动端间距
- 动态和项目条目的堆叠布局

如果某样东西只在手机上显示异常，请首先检查此媒体查询。

## 12. 更改或移除特定视觉元素

### 移除左侧栏的粘性行为

在 `assets/styles.css` 中找到：

```css
.profile-sticky {
  position: sticky;
  top: 36px;
}
```

将其改为：

```css
.profile-sticky {
  position: static;
}
```

### 完全移除顶部头像块

从 `index.html` 中删除此块：

```html
<div class="portrait-card" aria-hidden="true">
  <div class="portrait-mark">ZZ</div>
</div>
```

然后根据需要减少 CSS 中 `.profile-copy` 周围的间距。

### 移除博客链接

从以下位置删除博客链接：

- `.profile-links`
- `写作` 章节
- 页脚

## 13. 添加可下载的 CV PDF

### 第 1 步：添加文件

将文件放在仓库根目录或一个简单的文件夹中，例如：

- `cv.pdf`

### 第 2 步：在 `index.html` 中链接它

示例：

```html
<a href="./cv.pdf" target="_blank" rel="noreferrer">CV</a>
```

适合放置的位置：

- `.profile-links`
- `联系方式` 章节

## 14. 添加外部平台

常见的添加内容：

- LinkedIn
- Google Scholar
- ORCID
- X / Twitter
- 知乎
- Bilibili
- Notion

示例：

```html
<a href="https://www.linkedin.com/in/your-id/" target="_blank" rel="noreferrer">LinkedIn</a>
```

## 15. 更改页面语言

当前页面语言为：

```html
<html lang="zh-CN">
```

如果你的整个页面改为英文，请将其改为：

```html
<html lang="en">
```

然后更新可见文本，如：

- `个人简介`
- `精选作品`
- `写作`
- `联系方式`

你也可以直接在 `index.html` 中重写章节标签和段落，将整个页面改为中文。

## 16. SEO 和浏览器元数据

重要的元数据现在主要在 `editable/site-data.js` 中：

- `meta.title`
- `meta.description`

每当更改身份信息或页面重点时，请更新它们。

良好的 `description` 风格：

- 一句话
- 120 到 160 个字符
- 清楚说明你是谁以及此页面包含什么内容

## 17. 部署工作流

自动部署由以下文件控制：

- `.github/workflows/pages.yaml`

通常你不需要编辑它。

仅在以下情况下修改：

- 部署失败
- 你重命名了默认分支
- 你后续添加了构建步骤

对于纯 HTML/CSS 的更改，只需 `git push` 即可。

## 18. 故障排除

### 更改未在线上显示

检查：

1. 是否执行了 `git push`
2. GitHub Actions 是否成功完成
3. 是否强制刷新了浏览器
4. 是否等待了 1 到 3 分钟让 Pages 缓存刷新

### 左侧导航链接不起作用

检查是否匹配：

- `href="#某内容"` 与
- `<section id="某内容">`

### 布局突然错乱

常见原因：

- 缺少闭合的 `</div>`、`</section>` 或 `</article>`
- 在 HTML 中更改了类名但未更新 CSS
- 意外删除了媒体查询块中的内容

### 字体不加载

检查：

- Google Fonts 的 URL
- CSS 中的 `font-family` 名称
- 你的网络连接

### 链接在当前标签页打开但你希望在新标签页打开

对于外部链接使用：

```html
target="_blank" rel="noreferrer"
```

## 19. 推荐编辑策略

如果只想修改内容：

- 编辑 `editable/site-data.js`

如果只想修改外观：

- 编辑 `editable/overrides.css`
- 或编辑 `assets/styles.css` 修改基础样式

如果两者都想修改：

1. 更新 `editable/site-data.js`
2. 本地预览
3. 调整 `editable/overrides.css`
4. 再次预览
5. 提交并推送

## 20. 安全更改检查清单

推送前，快速检查：

- 姓名在 `<title>` 和 `<h1>` 中都正确
- 邮箱和社交链接有效
- 所有左侧导航链接指向存在的章节
- 没有残留的占位文本
- 移动端布局仍然合理
- 博客链接仍然指向 `https://zicheng1119.github.io/freeandeasy/`（如果你希望保留）

## 21. 最快的个性化方法

如果你只想尽快将当前页面变成真实版本，优先编辑以下五个区域：

1. `profile`
2. `links`
3. `sections[0]`（个人简介）
4. `sections[1]`（动态更新）
5. `sections[2]`（精选作品）

仅此就足以将当前骨架页面变成一个真实的主页。
