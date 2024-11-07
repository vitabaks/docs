// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PostgreSQL High-Availability Cluster',
  tagline: 'Ensure 24/7 Uptime for Your PostgreSQL Database',
  favicon: 'img/postgres.svg',

  // Set the production url of your site here
  url: 'https://postgresql-cluster.org',
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
      //image: 'img/postgresql_cluster.png',
      /*
      announcementBar: {
        content:
          //'🎉️ <a target="_blank" href="https://github.com/vitabaks/postgresql_cluster/releases/tag/2.0.0">postgresql_cluster v2.0</a> is out! 🥳️',
          // '⭐️ If you like <b>postgresql_cluster</b>, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/vitabaks/postgresql_cluster">GitHub</a>! ⭐️',
          backgroundColor: '#F6F8FA',
          textColor: '#091E42',
          isCloseable: true,
      },
      */
      navbar: {
        title: 'PostgreSQL Cluster',
        logo: {
          alt: 'PostgreSQL Cluster',
          src: 'img/postgres.svg',
        },
        items: [
          {
            // Product Hunt Badge
            type: 'html',
            position: 'left',
            value: `<a href="https://www.producthunt.com/posts/postgresql-cluster-org?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-postgresql&#0045;cluster&#0045;org" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=583645&theme=light" alt="postgresql&#0045;cluster&#0046;org - The&#0032;open&#0045;source&#0032;alternative&#0032;to&#0032;cloud&#0045;managed&#0032;databases | Product Hunt" style="width: 180px;" /></a>`,
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
            href: 'https://github.com/vitabaks/postgresql_cluster',
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
                href: 'https://github.com/vitabaks/postgresql_cluster',
              },
            ],
          },
          {
            title: 'Social',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/VKukharik',
              },
            ],
          },
          {
            title: 'Contact',
            items: [
              {
                label: 'info@postgresql-cluster.org',
                to: 'mailto:info@postgresql-cluster.org',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PostgreSQL Cluster Project.`,
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
