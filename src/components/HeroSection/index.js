import React, { useEffect, useState } from 'react';
import TrustedByCarousel from '@site/src/components/TrustedByCarousel';
import styles from './styles.module.css';

const LINE1 = 'DATABASE PLATFORM';
const LINE2 = 'FOR POSTGRESQL';
const SUBTEXT = 'Self-Hosted DBaaS [Database as a Service]';
const SUBTEXT_SPEED = 42;
const SUB_DELAY = 160;

export default function HeroSection() {
  const [subCount, setSubCount] = useState(0);
  const [subStarted, setSubStarted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = setTimeout(() => setSubStarted(true), SUB_DELAY);
    return () => clearTimeout(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !subStarted || subCount >= SUBTEXT.length) return undefined;
    const id = setTimeout(() => setSubCount((count) => count + 1), SUBTEXT_SPEED);
    return () => clearTimeout(id);
  }, [subStarted, subCount, prefersReducedMotion]);

  const visibleSubtext = prefersReducedMotion
    ? SUBTEXT
    : SUBTEXT.slice(0, subCount);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
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
          <span className="landing-sr-only">{SUBTEXT}</span>
          <span aria-hidden="true">
            {(subStarted || prefersReducedMotion) && visibleSubtext}
            {(subStarted || prefersReducedMotion) && <span className={styles.cursor}>_</span>}
          </span>
        </p>

        <TrustedByCarousel />
      </div>
    </section>
  );
}
