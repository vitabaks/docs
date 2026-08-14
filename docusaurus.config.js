// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Automated database platform for PostgreSQL',
  tagline: 'Automate deployment, failover, backups, restore, upgrades, scaling, and more with ease',
  favicon: 'img/autobase.svg',

  // Set the production url of your site here
  url: 'https://autobase.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'autobase-tech', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/autobase-tech/docs/tree/main/',
        },
        blog: false, // disable the blog plugin (TODO)
        /*
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/autobase-tech/docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        */
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/autobase-social-card.png',
      /*
      announcementBar: {
        content:
          '<span class="announcement-system">[ SYSTEM UPDATE ]</span> <a target="_blank" rel="noopener noreferrer" href="https://github.com/autobase-tech/autobase/releases/tag/2.10.0">Autobase 2.10 released -&gt;</a>',
        backgroundColor: 'rgb(255 92 40 / 15%)',
        isCloseable: true,
      },
      */
      navbar: {
        hideOnScroll: true,
        title: 'autobase',
        logo: {
          alt: 'autobase',
          src: 'img/autobase.svg',
        },
        items: [
          {
            href: '/docs/support',
            label: 'Support',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: `<a href="https://github.com/autobase-tech/autobase" target="_blank" style="display: flex; align-items: center;"><img src="https://img.shields.io/github/stars/autobase-tech/autobase?style=social" alt="GitHub stars" style="height: 22px;"></a>`,
          }
        ],
      },
      docs: {
        sidebar: {
          hideable: true, // Enable the hideable sidebar feature
          autoCollapseCategories: true, // Optional: set to false if you don't want categories to auto-collapse
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      algolia: {
        appId: 'WOUWH5V3FC',
        apiKey: 'ab353f5cc2b0bce47c98aaded805d8cd',
        indexName: 'postgresql-cluster',
        contextualSearch: true,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
