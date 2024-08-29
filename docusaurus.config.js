// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PostgreSQL Cluster documentation',
  tagline: 'PostgreSQL Cluster',
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
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
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
          // Please change this to your repo.
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
      announcementBar: {
        content:
          '🎉️ <a target="_blank" href="https://github.com/vitabaks/postgresql_cluster/releases/tag/2.0.0">postgresql_cluster v2.0</a> is out! 🥳️',
          //'⭐️ If you like postgresql_cluster, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/vitabaks/postgresql_cluster">GitHub</a>! ⭐️',
          backgroundColor: '#F6F8FA',
          textColor: '#091E42',
          isCloseable: true,
      },
      navbar: {
        title: 'PostgreSQL Cluster\ndocumentation',
        logo: {
          alt: 'PostgreSQL Cluster documentation',
          src: 'img/postgres.svg',
        },
        items: [
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: '/support',
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
      /*
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/VKukharik',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/vitabaks/postgresql_cluster',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} postgresql_cluster Project. Built with Docusaurus.`,
      },
      */
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
    }),
};

export default config;
