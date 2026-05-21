/**
 * ============================================================================
 * site-data.js — 简历页面的核心数据文件
 * ============================================================================
 *
 * 这个文件是整张简历页面的"内容大脑"。
 * 页面骨架（index.html）、样式（assets/styles.css）和渲染逻辑（assets/render.js）
 * 都会从这个对象中读取数据来构建你看到的页面。
 *
 * 页面对应的视觉结构如下：
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │  <title> 标签 & SEO 描述  ← meta                     │
 *   ├──────────────┬───────────────────────────────────────┤
 *   │  左栏 (侧边栏) │  右栏 (主内容区)                       │
 *   │              │                                       │
 *   │  ┌────────┐ │  ┌───────────────────────────────────┐ │
 *   │  │ 头像/   │ │  │  简介块  ← intro                   │ │
 *   │  │ initials│ │  └───────────────────────────────────┘ │
 *   │  └────────┘ │  ┌───────────────────────────────────┐ │
 *   │  姓名/角色   │ │  │  个人简介  ← sections[0] (bio)     │ │
 *   │  归属单位    │ │  ├───────────────────────────────────┤ │
 *   │  ← profile  │ │  │  动态更新  ← sections[1] (updates) │ │
 *   │              │ │  ├───────────────────────────────────┤ │
 *   │  链接列表    │ │  │  精选作品  ← sections[2] (work)    │ │
 *   │  ← links    │ │  ├───────────────────────────────────┤ │
 *   │              │ │  │  写作      ← sections[3] (writing) │ │
 *   │  导航锚点    │ │  ├───────────────────────────────────┤ │
 *   │  ← nav      │ │  │  联系方式  ← sections[4] (contact) │ │
 *   │              │ │  └───────────────────────────────────┘ │
 *   │              │ │  页脚  ← footer                       │
 *   └──────────────┴───────────────────────────────────────┘
 *
 * 修改技巧：
 * - 改内容 → 只需编辑这个文件
 * - 改外观 → 编辑 editable/overrides.css 或 assets/styles.css
 * - 改骨架 → 编辑 index.html
 */

window.resumeSiteData = {

  // =========================================================================
  // meta — 页面的"身份证"
  // =========================================================================
  // 对应页面中的：
  //   - 浏览器标签页标题（<title>）
  //   - SEO 描述（<meta name="description">）
  //   - <html lang="..."> 的语言声明
  // =========================================================================
  meta: {
    lang: "zh-CN",                           // 页面语言：中文简体
    title: "Zicheng Zhou",                   // 浏览器标签页上显示的文字
    description: "Personal homepage of Zicheng Zhou, including short bio, selected work, writing, and contact information."
                                              // 搜索引擎结果中显示的摘要文字
  },

  // =========================================================================
  // profile — 左栏顶部的个人信息区
  // =========================================================================
  // 对应页面中左侧栏最上方的区域：
  //   - 大头像 / 首字母缩写真（portrait-card）
  //   - 姓名
  //   - 角色 / 身份
  //   - 归属单位 / 城市
  // =========================================================================
  profile: {
    initials: "ZZ",                          // 头像区域的缩写字母（没有照片时显示）
    name: "Zicheng Zhou",                    // 你的全名（显示在左栏）
    role: "Engineering Student",             // 你的角色 / 职业身份
    affiliation: "Hangzhou / Zhejiang University", // 归属单位 / 所在城市
    photo: {
      src: "./editable/images/avator.jpg",   // 头像图片路径（替换 initials）
      alt: "Portrait of Zicheng Zhou"        // 图片无法加载时的替代文字
    }
  },

  // =========================================================================
  // links — 左栏的联系方式链接列表
  // =========================================================================
  // 对应页面中左侧栏 profile 下方的链接图标 / 文字行。
  // 每个对象渲染为一个可点击的链接。
  // external: true  → 外部链接，新标签页打开
  // external: false → 站内链接，当前标签页打开
  // =========================================================================
  links: [
    {
      label: "Email",                        // 链接显示的文字
      href: "mailto:zhouzicheng66@163.com",  // 点击后跳转的地址（这里是发邮件）
      external: true
    },
    {
      label: "GitHub",
      href: "https://github.com/zicheng1119",
      external: true
    },
    {
      label: "Blog",
      href: "https://zicheng1119.github.io/freeandeasy/",
      external: false                                // 这是一个站内链接，假设博客也部署在同一域下
    }
  ],

  // =========================================================================
  // nav — 左栏的章节导航
  // =========================================================================
  // 对应页面中左侧栏下方的导航列表。
  // 点击每个导航项会平滑滚动到右栏对应的章节。
  // 重要：每个 nav 项的 id 必须与下方 sections 中某个章节的 id 完全一致，
  //       否则点击后不会跳转。
  // =========================================================================
  nav: [
    { id: "bio", label: "Short Bio" },       // 跳转到 → sections 中的个人简介
    { id: "updates", label: "Updates" },     // 跳转到 → sections 中的动态更新
    { id: "work", label: "Selected Work" },  // 跳转到 → sections 中的精选作品
    { id: "writing", label: "Writing" },     // 跳转到 → sections 中的写作
    { id: "contact", label: "Contact" }      // 跳转到 → sections 中的联系方式
  ],

  // =========================================================================
  // intro — 右栏最顶部的简介块
  // =========================================================================
  // 对应页面中右栏内容区开头的引导语。
  // kicker → 小标签 / 分类标识
  // text  → 一句话或一段简短的介绍
  // =========================================================================
  intro: {
    kicker: "Personal Homepage",             // 小标签文字（显示在简介上方）
    text: "This page is a stable profile surface for my resume, portfolio, and contact information. It is intentionally concise and focused, while my blog serves as the place for longer notes and ongoing work."
                                              // 简介正文
  },

  // =========================================================================
  // sections — 右栏的主要内容区（核心）
  // =========================================================================
  // 这是页面最主要的部分，包含多个章节块。
  // 每个章节按 type 决定渲染方式：
  //   type: "bio"      → 段落式个人简介
  //   type: "updates"  → 带日期的动态时间线
  //   type: "work"     → 带元信息、标题、描述和链接的项目卡片
  //   type: "text"     → 通用文字章节（段落 + 链接）
  // =========================================================================
  sections: [

    // -----------------------------------------------------------------------
    // 章节 1：个人简介（Short Bio）
    // -----------------------------------------------------------------------
    // 对应页面右栏第一个内容块："Short Bio"
    // 显示为若干段文字，介绍你的背景、兴趣和当前状态。
    // -----------------------------------------------------------------------
    {
      type: "bio",                           // 章节类型：个人简介（纯文字段落）
      id: "bio",                             // 唯一标识，与 nav 中的 id 对应
      title: "Short Bio",                    // 章节标题
      paragraphs: [                          // 段落数组，每项渲染为一个 <p>
        "I am interested in building thoughtful digital experiences with a focus on frontend systems, publishing workflows, and clear information design. My work usually sits between writing, product shaping, and implementation: turning rough ideas into sites, tools, and public-facing artifacts that feel calm, readable, and durable.",
        "At the moment, I am using this site as the stable front door for my resume and portfolio, while keeping my blog at /freeandeasy/ as the place for longer notes and ongoing work."
      ]
    },

    // -----------------------------------------------------------------------
    // 章节 2：动态更新（Updates）
    // -----------------------------------------------------------------------
    // 对应页面右栏的"Updates"时间线区域。
    // 每条更新显示日期（左侧）和文字（右侧）。
    // 适合放：论文接收、实习入职、项目启动、获奖、演讲等。
    // -----------------------------------------------------------------------
    {
      type: "updates",                       // 章节类型：动态时间线
      id: "updates",                         // 唯一标识，与 nav 中的 id 对应
      title: "Updates",                      // 章节标题
      items: [                               // 动态条目数组
        {
          date: "2026-05",                   // 日期（显示在左侧）
          text: "Launched this two-part personal site structure: root domain for resume, subpath for blog."
                                              // 动态正文
        },
        {
          date: "2026-05",
          text: "Built an independent Hugo blog workflow with GitHub Pages deployment."
        },
        {
          date: "Next",                      // 用 "Next" 标注计划中的事项
          text: "Replace placeholders on this page with your real education, experience, and projects."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // 章节 3：精选作品（Selected Work）
    // -----------------------------------------------------------------------
    // 对应页面右栏的项目卡片区域。
    // 每个项目卡片包含：
    //   - meta        → 分类标签（如 "Web / Systems"）
    //   - title       → 项目名称
    //   - description → 项目描述（2-4 行最佳）
    //   - links       → 操作链接（访问网站 / 查看源码等）
    // =========================================================================
    {
      type: "work",                          // 章节类型：项目作品卡片
      id: "work",                            // 唯一标识，与 nav 中的 id 对应
      title: "Selected Work",                // 章节标题
      items: [                               // 项目条目数组
        {
          meta: "Web / Systems",             // 项目分类标签
          title: "Free & Easy",              // 项目名称
          description: "A Hugo-based personal blog deployed to GitHub Pages as a project site, with custom search, independent theming, and a maintenance-friendly repository structure.",
                                              // 项目简介
          links: [                           // 项目相关链接
            {
              label: "Visit Site",           // 链接文字
              href: "https://zicheng1119.github.io/freeandeasy/",
              external: false
            },
            {
              label: "Source",
              href: "https://github.com/zicheng1119/freeandeasy",
              external: true
            }
          ]
        },
        {
          meta: "Resume / Design",
          title: "Personal Homepage",
          description: "A restrained academic-style homepage for identity, links, selected work, and contact. This page is intentionally compact and stable, serving as the canonical profile surface."
        },
        {
          meta: "Placeholder",               // 这是一个占位条目，替换成你自己的项目
          title: "Your Next Project",
          description: "Replace this entry with a real project, internship, lab, paper, startup, or product case. The layout is designed so you can keep adding sections like this without changing structure."
        }
      ]
    },

    // -----------------------------------------------------------------------
    // 章节 4：写作（Writing）
    // -----------------------------------------------------------------------
    // 对应页面右栏的"Writing"区域。
    // 通常作为通往博客的桥梁，可以放一段引导文字 + 博客链接。
    // -----------------------------------------------------------------------
    {
      type: "text",                          // 章节类型：通用文字
      id: "writing",                         // 唯一标识，与 nav 中的 id 对应
      title: "Writing",                      // 章节标题
      paragraphs: [                          // 段落数组
        "My longer-form notes and working thoughts are collected on the blog. It is where experiments, technical notes, and project reflections continue evolving."
      ],
      links: [                               // 章节末尾的链接
        {
          label: "Go to the blog",
          href: "https://zicheng1119.github.io/freeandeasy/",
          external: true
        }
      ]
    },

    // -----------------------------------------------------------------------
    // 章节 5：联系方式（Contact）
    // -----------------------------------------------------------------------
    // 对应页面右栏底部的"Contact"区域。
    // 告诉别人如何联系你：邮箱、GitHub、LinkedIn 等。
    // -----------------------------------------------------------------------
    {
      type: "text",                          // 章节类型：通用文字
      id: "contact",                         // 唯一标识，与 nav 中的 id 对应
      title: "Contact",                      // 章节标题
      paragraphs: [                          // 段落数组
        "The easiest way to reach me is by email: zhouzicheng66@163.com.",
        "You can also find my code and public projects on GitHub."
      ],
      links: [                               // 联系方式链接
        {
          label: "Email",
          href: "mailto:zhouzicheng66@163.com",
          external: true
        },
        {
          label: "GitHub",
          href: "https://github.com/zicheng1119",
          external: true
        }
      ]
    }
  ],

  // =========================================================================
  // footer — 页面底部
  // =========================================================================
  // 对应页面最下方的页脚区域。
  // copy  → 版权 / 更新说明文字
  // links → 页脚中的快捷链接
  // =========================================================================
  footer: {
    copy: "Last updated for the current two-site setup.",
                                              // 页脚说明文字
    links: [                                 // 页脚链接
      {
        label: "Blog",
        href: "https://zicheng1119.github.io/freeandeasy/",
        external: true
      },
      {
        label: "GitHub",
        href: "https://github.com/zicheng1119",
        external: true
      }
    ]
  }
};
