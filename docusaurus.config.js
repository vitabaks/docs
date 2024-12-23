// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Automated database platform for PostgreSQL',
  tagline: 'Automate failover, backups, restore, upgrades, scaling, and more with ease',
  favicon: 'img/autobase.svg',

  // Set the production url of your site here
  url: 'https://autobase.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vitabaks', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
            'https://github.com/vitabaks/docs/tree/main/',
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
            'https://github.com/vitabaks/docs/tree/main/',
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
      announcementBar: {
        content:
          '🎉️ <b><a target="_blank" href="https://github.com/vitabaks/autobase/releases/tag/2.1.0">autobase version 2.1.0 is out!</a></b> 🥳️',
          // '⭐️ If you like <b>autobase</b>, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/vitabaks/autobase">GitHub</a>! ⭐️',
          backgroundColor: '#f39c12',
          isCloseable: true,
      },
      navbar: {
        title: 'autobase',
        logo: {
          alt: 'autobase',
          src: 'img/autobase.svg',
        },
        items: [
          {
            // Product Hunt Badge
            type: 'html',
            position: 'left',
            value: `<a href="https://www.producthunt.com/products/postgresql_cluster" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=583645&theme=light" alt="postgresql&#0045;cluster&#0046;org - The&#0032;open&#0045;source&#0032;alternative&#0032;to&#0032;cloud&#0045;managed&#0032;databases | Product Hunt" style="width: 180px;" /></a>`,
          },
          {
            to: '/docs',
            label: 'Docs',
            position: 'right'
          },
          {
            href: '/docs/support',
            label: 'Support',
            position: 'right',
          },
          {
            href: 'https://github.com/vitabaks/autobase',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs',
              },
            ],
          },
          {
            title: 'Sponsor',
            items: [
              {
                label: 'Sponsor this project',
                to: 'docs/sponsor',
              },
            ],
          },
          {
            title: 'Repository',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/vitabaks/autobase',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'X (Twitter)',
                href: 'https://twitter.com/autobase_tech',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'info@autobase.tech',
                to: 'mailto:info@autobase.tech',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Autobase. All rights reserved.`,
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
