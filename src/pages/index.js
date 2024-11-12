import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CloudProviders from '@site/src/components/CloudProviders';
import About from '@site/src/components/About';
import Extensibility from '@site/src/components/Extensibility';
import Costs from '@site/src/components/Costs';
import Subscriptions from '@site/src/components/Subscriptions';
import Sponsors from '@site/src/components/Sponsors';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const [currentPlatform, setCurrentPlatform] = useState('Anywhere');
  const [platformIndex, setPlatformIndex] = useState(0);

  const platforms = ['AWS', 'GCP', 'Azure', 'DigitalOcean', 'Hetzner', 'Bare Metal', 'VMs', 'Anywhere'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prevIndex) => (prevIndex + 1) % platforms.length);
      setCurrentPlatform(platforms[platformIndex]);
    }, 3000); // Changes the platform every 3 seconds

    return () => clearInterval(interval);
  }, [platformIndex]);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Deploy HA Postgres on: <span className={styles.platform}>{currentPlatform}</span>
        </Heading>
        <Heading as="h2" className="hero__subtitle">
          Automated database platform for PostgreSQL®
        </Heading>
        <p>
          A modern, open-source alternative to cloud-managed databases.
        </p>
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
    <div style={{ position: 'relative', boxSizing: 'content-box', maxHeight: '80vh', width: '100%', aspectRatio: '1.643835616438356', padding: '40px 0', marginBottom: '20px' }}>
      <iframe
        src="https://app.supademo.com/embed/cm17ui80e035n13s2q3lkg5he?embed_v=2"
        title="PostgreSQL Cluster Console (UI) demo"
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
      title="postgresql_cluster"
      description="PostgreSQL High-Availability Cluster">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <CloudProviders />
        <About />
        <Extensibility />
        <DemoEmbed />
        <Costs />
        <Subscriptions />
        <Sponsors />
      </main>
    </Layout>
  );
}
