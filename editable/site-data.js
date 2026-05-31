/**
 * site-data.js — 简历页面的核心数据文件（双语版）
 *
 * 文字字段写成 { zh: "中文", en: "English" }，页面会按当前语言显示，
 * 右上角语言按钮可切换。也可以只写一个普通字符串（两种语言都用它）。
 *
 * - 改内容 → 编辑这个文件
 * - 改外观 → 编辑 editable/overrides.css 或 assets/styles.css
 * - 改骨架 → 编辑 index.html
 *
 * id / href / type / external / 图片路径 这类不是给人看的字段，保持普通字符串即可。
 */

window.resumeSiteData = {

  meta: {
    lang: "zh-CN",
    title: { zh: "周子诚", en: "Zicheng Zhou" },
    description: {
      zh: "周子诚的个人主页，包含简介、精选作品、写作与联系方式。",
      en: "Personal homepage of Zicheng Zhou, including short bio, selected work, writing, and contact information."
    }
  },

  profile: {
    initials: "ZZ",
    name: { zh: "周子诚", en: "Zicheng Zhou" },
    role: { zh: "工科学生", en: "Engineering Student" },
    affiliation: { zh: "杭州 / 浙江大学", en: "Hangzhou / Zhejiang University" },
    photo: {
      src: "./editable/images/avator.jpg",
      alt: { zh: "周子诚的头像", en: "Portrait of Zicheng Zhou" }
    }
  },

  links: [
    { label: { zh: "邮箱", en: "Email" }, href: "mailto:zhouzicheng66@163.com", external: true },
    { label: "GitHub", href: "https://github.com/zicheng1119", external: true },
    { label: { zh: "博客", en: "Blog" }, href: "https://zicheng1119.github.io/freeandeasy/", external: false }
  ],

  nav: [
    { id: "bio", label: { zh: "简介", en: "Short Bio" } },
    { id: "updates", label: { zh: "动态", en: "Updates" } },
    { id: "work", label: { zh: "精选作品", en: "Selected Work" } },
    { id: "writing", label: { zh: "写作", en: "Writing" } },
    { id: "contact", label: { zh: "联系方式", en: "Contact" } }
  ],

  intro: {
    kicker: { zh: "个人主页", en: "Personal Homepage" },
    text: {
      zh: "这个页面是我简历、作品与联系方式的稳定入口，刻意保持简洁专注；更长的笔记和持续进行的工作放在我的博客里。",
      en: "This page is a stable profile surface for my resume, portfolio, and contact information. It is intentionally concise and focused, while my blog serves as the place for longer notes and ongoing work."
    }
  },

  sections: [

    {
      type: "bio",
   id: "bio",
      title: { zh: "简介", en: "Short Bio" },
      paragraphs: [
  {
     zh: "我热衷于打造用心的数字体验，重点在前端系统、发布流程与清晰的信息设计。我的工作通常介于写作、产品打磨与实现之间：把粗糙的想法变成网站、工具和面向公众的作品，让它们读起来从容、清晰、耐用。",
          en: "I am interested in building thoughtful digital experiences with a focus on frontend systems, publishing workflows, and clear information design. My work usually sits between writing, product shaping, and implementation: turning rough ideas into sites, tools, and public-facing artifacts that feel calm, readable, and durable."
    },
     {
          zh: "目前我把这个站点作为简历与作品集的稳定门面，而把博客（/freeandeasy/）作为存放长篇笔记和持续工作的地方。",
          en: "At the moment, I am using this site as the stable front door for my resume and portfolio, while keeping my blog at /freeandeasy/ as the place for longer notes and ongoing work."
        }
    ]
    },

    {
  type: "updates",
  id: "updates",
      title: { zh: "动态", en: "Updates" },
      items: [
        {
    date: "2026-05",
          text: {
zh: "上线了双站点结构：主域名放简历，子路径放博客。",
  en: "Launched this two-part personal site structure: root domain for resume, subpath for blog."
          }
        },
      {
      date: "2026-05",
    text: {
      zh: "搭建了独立的 Hugo 博客工作流，部署到 GitHub Pages。",
     en: "Built an independent Hugo blog workflow with GitHub Pages deployment."
       }
        },
        {
          date: { zh: "计划中", en: "Next" },
  text: {
  zh: "用真实的教育、经历与项目替换页面上的占位内容。",
      en: "Replace placeholders on this page with your real education, experience, and projects."
          }
     }
      ]
    },

    {
      type: "work",
      id: "work",
      title: { zh: "精选作品", en: "Selected Work" },
      items: [
    {
  meta: { zh: "网页 / 系统", en: "Web / Systems" },
  title: "Free & Easy",
          description: {
         zh: "一个基于 Hugo 的个人博客，作为项目站点部署到 GitHub Pages，带有自定义搜索、独立主题，以及易于维护的仓库结构。",
     en: "A Hugo-based personal blog deployed to GitHub Pages as a project site, with custom search, independent theming, and a maintenance-friendly repository structure."
  },
          links: [
            { label: { zh: "访问站点", en: "Visit Site" }, href: "https://zicheng1119.github.io/freeandeasy/", external: false },
      { label: { zh: "源码", en: "Source" }, href: "https://github.com/zicheng1119/freeandeasy", external: true }
          ]
    },
        {
          meta: { zh: "简历 / 设计", en: "Resume / Design" },
      title: { zh: "个人主页", en: "Personal Homepage" },
          description: {
  zh: "一个克制的学术风个人主页，用于展示身份、链接、精选作品与联系方式。页面刻意保持紧凑稳定，作为权威的个人资料入口。",
 en: "A restrained academic-style homepage for identity, links, selected work, and contact. This page is intentionally compact and stable, serving as the canonical profile surface."
          }
        },
        {
          meta: { zh: "占位", en: "Placeholder" },
        title: { zh: "你的下一个项目", en: "Your Next Project" },
          description: {
            zh: "把这一条替换成真实的项目、实习、实验室、论文、创业或产品案例。这个版式设计成可以不断往下加同样的条目而不用改结构。",
        en: "Replace this entry with a real project, internship, lab, paper, startup, or product case. The layout is designed so you can keep adding sections like this without changing structure."
    }
        }
      ]
    },

    {
      type: "text",
      id: "writing",
   title: { zh: "写作", en: "Writing" },
      paragraphs: [
    {
          zh: "我更长篇的笔记和正在思考的内容都收在博客里。那里是实验、技术笔记和项目反思持续生长的地方。",
en: "My longer-form notes and working thoughts are collected on the blog. It is where experiments, technical notes, and project reflections continue evolving."
   }
      ],
      links: [
        { label: { zh: "前往博客", en: "Go to the blog" }, href: "https://zicheng1119.github.io/freeandeasy/", external: true }
      ]
    },

    {
  type: "text",
      id: "contact",
      title: { zh: "联系方式", en: "Contact" },
 paragraphs: [
        {
          zh: "联系我最方便的方式是邮件：zhouzicheng66@163.com。",
en: "The easiest way to reach me is by email: zhouzicheng66@163.com."
        },
        {
 zh: "你也可以在 GitHub 上找到我的代码和公开项目。",
      en: "You can also find my code and public projects on GitHub."
        }
      ],
      links: [
    { label: { zh: "邮箱", en: "Email" }, href: "mailto:zhouzicheng66@163.com", external: true },
        { label: "GitHub", href: "https://github.com/zicheng1119", external: true }
      ]
    }
  ],

  footer: {
    copy: {
      zh: "为当前的双站点结构而更新。",
      en: "Last updated for the current two-site setup."
    },
    links: [
      { label: { zh: "博客", en: "Blog" }, href: "https://zicheng1119.github.io/freeandeasy/", external: true },
      { label: "GitHub", href: "https://github.com/zicheng1119", external: true }
  ]
  }
};
