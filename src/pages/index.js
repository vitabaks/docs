import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CloudProviders from '@site/src/components/CloudProviders';
import About from '@site/src/components/About';
import Features from '@site/src/components/Features';
import Costs from '@site/src/components/Costs';
import Subscriptions from '@site/src/components/Subscriptions';
import Sponsors from '@site/src/components/Sponsors';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function SectionWithBackground({ children }) {
  const { colorMode } = useColorMode();
  const [currentMode, setCurrentMode] = useState(null);

  useEffect(() => {
    setCurrentMode(colorMode);
  }, [colorMode]);

  if (currentMode === null) {
    return null;
  }

  const overlayOpacity = currentMode === 'dark' ? 0.85 : 0.8; // Dynamic transparency based on theme

  return (
    <div
      style={{
        position: 'relative',
        background: `url('/img/autobase_create_cluster_demo.gif') no-repeat center center`,
        backgroundSize: 'cover',
        padding: '40px 0',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1,
        }}
      ></div>
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h2" style={{ fontSize: '2.6rem', fontWeight: '600' }} className={styles.gradientText}>
          Autobase for PostgreSQL® - Your Self-Hosted DBaaS
        </Heading>
        <Heading as="h3" style={{ fontSize: '1.4rem', fontWeight: '400' }}>
          Open-source alternative to cloud-managed databases
        </Heading>
        <Heading as="h3" style={{ fontSize: '1.4rem', fontWeight: '400', marginTop: '40px', marginBottom: '40px' }} className={styles.heroBanner_description}>
          Autobase is a comprehensive Database-as-a-Service (DBaaS) solution for deploying and managing PostgreSQL databases,
          designed for database administrators (DBAs) and developers.
        </Heading>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function DemoEmbed() {
  return (
    <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '1.643835616438356', padding: '40px 0' }}>
      <iframe
        src="https://app.supademo.com/embed/cm17ui80e035n13s2q3lkg5he?embed_v=2"
        title="Autobase Console (UI) demo"
        allow="clipboard-write"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <SectionWithBackground>
        <HomepageHeader />
      </SectionWithBackground>
      <main>
        <Features />
        <CloudProviders />
        <DemoEmbed />
        <Costs />
        <Sponsors />
      </main>
    </Layout>
  );
}
