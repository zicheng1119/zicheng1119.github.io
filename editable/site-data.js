window.resumeSiteData = {
  meta: {
    lang: "zh-CN",
    title: "Zicheng Zhou",
    description: "Personal homepage of Zicheng Zhou, including short bio, selected work, writing, and contact information."
  },
  profile: {
    initials: "ZZ",
    name: "Zicheng Zhou",
    role: "Builder, writer, and frontend-focused product maker",
    affiliation: "Shanghai / Remote",
    // photo: {
    //   src: "./editable/images/portrait.jpg",
    //   alt: "Portrait of Zicheng Zhou"
    // }
  },
  links: [
    {
      label: "zhouzicheng66@163.com",
      href: "mailto:zhouzicheng66@163.com",
      external: false
    },
    {
      label: "GitHub",
      href: "https://github.com/zicheng1119",
      external: true
    },
    {
      label: "Blog",
      href: "https://zicheng1119.github.io/freeandeasy/",
      external: false
    }
  ],
  nav: [
    { id: "bio", label: "Short Bio" },
    { id: "updates", label: "Updates" },
    { id: "work", label: "Selected Work" },
    { id: "writing", label: "Writing" },
    { id: "contact", label: "Contact" }
  ],
  intro: {
    kicker: "Personal Homepage",
    text: "This page is the concise version of who I am and what I am building. Longer notes, experiments, and drafts live on my blog."
  },
  sections: [
    {
      type: "bio",
      id: "bio",
      title: "Short Bio",
      paragraphs: [
        "I am interested in building thoughtful digital experiences with a focus on frontend systems, publishing workflows, and clear information design. My work usually sits between writing, product shaping, and implementation: turning rough ideas into sites, tools, and public-facing artifacts that feel calm, readable, and durable.",
        "At the moment, I am using this site as the stable front door for my resume and portfolio, while keeping my blog at /freeandeasy/ as the place for longer notes and ongoing work."
      ]
    },
    {
      type: "updates",
      id: "updates",
      title: "Updates",
      items: [
        {
          date: "2026-05",
          text: "Launched this two-part personal site structure: root domain for resume, subpath for blog."
        },
        {
          date: "2026-05",
          text: "Built an independent Hugo blog workflow with GitHub Pages deployment."
        },
        {
          date: "Next",
          text: "Replace placeholders on this page with your real education, experience, and projects."
        }
      ]
    },
    {
      type: "work",
      id: "work",
      title: "Selected Work",
      items: [
        {
          meta: "Web / Systems",
          title: "Free & Easy",
          description: "A Hugo-based personal blog deployed to GitHub Pages as a project site, with custom search, independent theming, and a maintenance-friendly repository structure.",
          links: [
            {
              label: "Visit Site",
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
          meta: "Placeholder",
          title: "Your Next Project",
          description: "Replace this entry with a real project, internship, lab, paper, startup, or product case. The layout is designed so you can keep adding sections like this without changing structure."
        }
      ]
    },
    {
      type: "text",
      id: "writing",
      title: "Writing",
      paragraphs: [
        "My longer-form notes and working thoughts are collected on the blog. It is where experiments, technical notes, and project reflections continue evolving."
      ],
      links: [
        {
          label: "Go to the blog",
          href: "https://zicheng1119.github.io/freeandeasy/",
          external: false
        }
      ]
    },
    {
      type: "text",
      id: "contact",
      title: "Contact",
      paragraphs: [
        "The easiest way to reach me is by email: zhouzicheng66@163.com.",
        "You can also find my code and public projects on GitHub."
      ],
      links: [
        {
          label: "Email",
          href: "mailto:zhouzicheng66@163.com",
          external: false
        },
        {
          label: "GitHub",
          href: "https://github.com/zicheng1119",
          external: true
        }
      ]
    }
  ],
  footer: {
    copy: "Last updated for the current two-site setup.",
    links: [
      {
        label: "Blog",
        href: "https://zicheng1119.github.io/freeandeasy/",
        external: false
      },
      {
        label: "GitHub",
        href: "https://github.com/zicheng1119",
        external: true
      }
    ]
  }
};
