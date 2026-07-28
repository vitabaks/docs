import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const demos = [
  {
    id: 'clusters',
    label: 'Deployment',
    file: 'clusters.mp4',
    description: 'Provision a production-ready PostgreSQL cluster.',
  },
  {
    id: 'parameters',
    label: 'Parameters',
    file: 'parameters.mp4',
    description: 'Change cluster and system parameters from the platform interface.',
  },
  {
    id: 'sql-editor',
    label: 'SQL Editor',
    file: 'sql-editor.mp4',
    description: 'Run SQL queries directly from the platform interface.',
  },
];

export default function PlatformOverviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mediaStatus, setMediaStatus] = useState('loading');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const videoRef = useRef(null);
  const mediaRoot = useBaseUrl('/video/platform-overview/');
  const activeDemo = demos[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    setMediaStatus('loading');
  }, [activeIndex]);

  useEffect(() => {
    if (!sectionRef.current) return undefined;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: 0.35 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (prefersReducedMotion || !isInView) {
      videoRef.current.pause();
      return;
    }

    videoRef.current.play().catch(() => {});
  }, [activeIndex, mediaStatus, prefersReducedMotion, isInView]);

  function selectTab(index) {
    setActiveIndex(index);
  }

  function handleVideoEnded() {
    if (prefersReducedMotion || !isInView) return;
    setActiveIndex((currentIndex) => (currentIndex + 1) % demos.length);
  }

  function handleTabKeyDown(event, index) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + demos.length) % demos.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % demos.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = demos.length - 1;

    selectTab(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="platform-overview-title">
      <div className={styles.inner}>
        <h2 id="platform-overview-title" className={styles.sectionLabel}>
          <span aria-hidden="true">//</span>
          Platform overview
        </h2>

        <div className={styles.tabs} role="tablist" aria-label="Platform demonstrations">
          {demos.map((demo, index) => (
            <button
              key={demo.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`platform-tab-${demo.id}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`platform-panel-${demo.id}`}
              tabIndex={activeIndex === index ? 0 : -1}
              className={`${styles.tab} ${activeIndex === index ? styles.tabActive : ''}`}
              onClick={() => selectTab(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
            >
              <span className={styles.tabPrompt} aria-hidden="true">{activeIndex === index ? '>' : '/'}</span>
              {demo.label}
            </button>
          ))}
        </div>

        <div className={styles.browser}>
          <div className={styles.browserBar} aria-hidden="true">
            <div className={styles.browserControls}>
              <span />
              <span />
              <span />
            </div>
          </div>

          <div
            id={`platform-panel-${activeDemo.id}`}
            role="tabpanel"
            aria-labelledby={`platform-tab-${activeDemo.id}`}
            className={styles.viewport}
          >
            <video
              key={activeDemo.id}
              ref={videoRef}
              className={`${styles.video} ${mediaStatus === 'ready' ? styles.videoReady : ''}`}
              src={`${mediaRoot}${activeDemo.file}`}
              muted
              playsInline
              preload="metadata"
              aria-label={activeDemo.description}
              onCanPlay={() => setMediaStatus('ready')}
              onEnded={handleVideoEnded}
              onError={() => setMediaStatus('error')}
            />

            {mediaStatus !== 'ready' && (
              <div className={styles.placeholder} aria-live="polite">
                <div className={styles.placeholderHeader}>
                  <span className={styles.placeholderPrompt}>&gt;</span>
                  <span>{activeDemo.id.toUpperCase()} DEMO</span>
                  <span className={styles.placeholderState}>
                    {mediaStatus === 'error' ? 'MEDIA PENDING' : 'LOADING'}
                  </span>
                </div>
                <div className={styles.placeholderBody}>
                  <div className={styles.mockSidebar}>
                    <span className={styles.mockActive} />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.mockContent}>
                    <div className={styles.mockTitle}>{activeDemo.description}</div>
                    <div className={styles.mockToolbar}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.mockGrid}>
                      {Array.from({ length: 8 }, (_, index) => <span key={index} />)}
                    </div>
                    <div className={styles.mediaHint}>/video/platform-overview/{activeDemo.file}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
