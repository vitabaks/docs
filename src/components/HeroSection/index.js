import React from 'react';
import Link from '@docusaurus/Link';
import TrustedByCarousel from '@site/src/components/TrustedByCarousel';
import styles from './styles.module.css';

const LINE1 = 'DATABASE PLATFORM';
const LINE2 = 'FOR POSTGRESQL';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <p className={styles.label}><span aria-hidden="true">//</span> Self-Hosted DBaaS</p>
        <h1 className={styles.heading}>
          <span className="landing-sr-only">
            {LINE1} {LINE2}
          </span>
          <span aria-hidden="true">
            <span className={styles.line}>{LINE1}</span>
            <span className={styles.line}>{LINE2}</span>
          </span>
        </h1>

        <p className={styles.subheading}>
          The simplicity of managed PostgreSQL.{' '}
          <span className={styles.subheadingSecondLine}>On your own infrastructure.</span>
        </p>

        <div className={styles.actions}>
          <Link className={`${styles.button} ${styles.primaryButton}`} to="/docs#getting-started" aria-describedby="hero-trial-details">
            <span aria-hidden="true">&gt;</span> Start your free trial <span aria-hidden="true">↵</span>
          </Link>
          <span id="hero-trial-details" className={styles.trialDetails}>Enterprise edition · 14 days free</span>
        </div>

        <TrustedByCarousel />

        <a
          className={styles.reference}
          href="https://docs.cloud.google.com/distributed-cloud/hosted/docs/latest/gdcag/solutions/postgres-db-architecture"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.referenceText}>
            <strong>Named as a reference automation tool in Google Distributed Cloud air-gapped PostgreSQL architecture</strong>
            <span><span className={styles.referenceAccent}>Google Cloud</span> documentation identifies Autobase for provisioning and configuring the HA PostgreSQL stack.</span>
          </span>
          <span className={styles.referenceLink}>View source documentation <span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </section>
  );
}
