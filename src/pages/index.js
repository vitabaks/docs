import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
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

  const overlayOpacity = currentMode === 'dark' ? 0.6 : 0.5; // Dynamic transparency based on theme

  return (
    <div style={{ position: 'relative', padding: '40px 0', overflow: 'hidden' }}>
      <video
        src="/img/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'blur(2px)',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1,
        }}
      />
    </div>
  );
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" style={{ fontSize: '2.5rem', fontWeight: '600' }} className={styles.gradientText}>
          Autobase for PostgreSQL® - Your own DBaaS
        </Heading>
        <Heading as="h2" style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '20px' }} className={styles.heroBanner_description}>
          Open-source, self-hosted DBaaS / Postgres automation
        </Heading>
        <Heading as="h3" style={{ fontSize: '1.3rem', fontWeight: '400', marginBottom: '20px', color: '#c7c7c7' }} className={styles.heroBanner_description}>
          Autobase automates deployment and maintenance, ensuring high availability, scalability, and cost efficiency—even for teams without deep DBA expertise.
          <br />
          Say goodbye to manual database management!
        </Heading>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://demo.autobase.tech">
            Demo
          </Link>
          <Link
            className="button button--primary button--lg"
            style={{ marginLeft: '10px' }}
            to="/docs">
            Get Started
          </Link>
        </div>
        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#c7c7c7', marginTop: '10px' }}>
          (use the token <strong>demo</strong> to access)
        </p>
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
  useEffect(() => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    nav.classList.add('navbar--transparent');
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('navbar--scrolled');
      else nav.classList.remove('navbar--scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <Layout
      title="autobase"
      description="Automated database platform for PostgreSQL">
      <SectionWithBackground>
        <HomepageHeader />
      </SectionWithBackground>
      <main>
        <CloudProviders />
        <DemoEmbed />
        <Features />
        <Costs />
        <Sponsors />
      </main>
    </Layout>
  );
}
