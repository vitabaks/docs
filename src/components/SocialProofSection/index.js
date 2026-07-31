import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

const ROTATION_INTERVAL_MS = 6500;
const EXIT_DURATION_MS = 340;
const TRANSITION_DURATION_MS = 1200;

const BANNERS = [
  {
    id: 'time-to-value',
    before: '1 Month of Infrastructure Work',
    after: '10 Minutes in Autobase',
    visual: 'time-to-value',
  },
  {
    id: 'production-history',
    beforeAccent: '7 Years',
    before: 'in Production',
    after: null,
    visual: 'production-history',
  },
];

function getRandomBannerOrder(length) {
  const order = Array.from({length}, (_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
  }

  return order;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function CalendarWithClockIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Calendar body */}
      <rect x="6" y="12" width="52" height="46" rx="4" stroke="currentColor" strokeWidth="2.2"/>
      {/* Top bar */}
      <rect x="6" y="12" width="52" height="14" rx="4" fill="currentColor" opacity="0.07"/>
      <line x1="6" y1="26" x2="58" y2="26" stroke="currentColor" strokeWidth="2"/>
      {/* Ring tabs */}
      <line x1="20" y1="6" x2="20" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="44" y1="6" x2="44" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Date dots — row 1 */}
      <circle cx="20" cy="34" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="34" r="2.5" fill="var(--color-border)"/>
      <circle cx="44" cy="34" r="2.5" fill="var(--color-border)"/>
      {/* Date dots — row 2 */}
      <circle cx="20" cy="43" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="43" r="2.5" fill="var(--color-border)"/>
      <circle cx="44" cy="43" r="2.5" fill="var(--color-border)"/>
      {/* Date dots — row 3 */}
      <circle cx="20" cy="52" r="2.5" fill="var(--color-border)"/>
      <circle cx="32" cy="52" r="2.5" fill="var(--color-border)"/>

      {/* Clock overlay — bottom right */}
      <circle cx="52" cy="54" r="13" fill="var(--color-bg)" stroke="currentColor" strokeWidth="2"/>
      <line x1="52" y1="46" x2="52" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="52" y1="54" x2="58" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="52" cy="54" r="2" fill="currentColor"/>
    </svg>
  );
}

function StopwatchIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      {/* Speed lines */}
      <line x1="4"  y1="34" x2="14" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="6"  y1="42" x2="16" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="4"  y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Top button */}
      <rect x="30" y="4" width="12" height="6" rx="3" fill="currentColor"/>
      {/* Stopwatch circle */}
      <circle cx="42" cy="44" r="25" stroke="currentColor" strokeWidth="2.5"/>
      {/* Side crown/button */}
      <line x1="54" y1="22" x2="60" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="57" y="11" width="8" height="5" rx="2" fill="currentColor"/>
      {/* "10" text */}
      <text
        x="42" y="46"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
        fontWeight="800"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
      >10</text>
      {/* "MIN" text */}
      <text
        x="42" y="60"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="8"
        fontWeight="700"
        fill="currentColor"
        letterSpacing="1"
        fontFamily="system-ui, sans-serif"
      >MIN</text>
    </svg>
  );
}

function BannerVisual({type}) {
  if (type === 'production-history') {
    return (
      <div className={styles.productionTimeline} aria-hidden="true">
        <div className={styles.timelineYears}>
          <span>2019</span>
          <span>2026</span>
        </div>
        <div className={styles.timelineRail}>
          <span className={styles.startNode} />
          <span className={styles.currentYear} />
        </div>
        <div className={styles.timelineLabels}>
          <span>INITIAL RELEASE</span>
          <span><b>&gt;</b> PRODUCTION READY</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.timeBlock}>
        <CalendarWithClockIcon />
        <span className={styles.timeLabel}>1 MONTH</span>
      </div>

      <svg className={styles.arrow} width="48" height="24" viewBox="0 0 48 24" fill="none">
        <line x1="0" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <polyline points="30,4 42,12 30,20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <div className={styles.divider} />

      <div className={styles.timeBlock}>
        <StopwatchIcon />
        <span className={`${styles.timeLabel} ${styles.accentLabel}`}>10 MINUTES</span>
      </div>
    </div>
  );
}

export default function SocialProofSection() {
  const [bannerOrder, setBannerOrder] = useState(() => BANNERS.map((_, index) => index));
  const [activePosition, setActivePosition] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const exitTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setBannerOrder(getRandomBannerOrder(BANNERS.length));
  }, []);

  useEffect(() => () => {
    window.clearTimeout(exitTimerRef.current);
    window.clearTimeout(transitionTimerRef.current);
  }, []);

  const showBanner = useCallback((nextPosition) => {
    if (nextPosition === activePosition || isTransitioning) return;

    if (prefersReducedMotion) {
      setActivePosition(nextPosition);
      return;
    }

    setIsTransitioning(true);
    setIsExiting(true);

    exitTimerRef.current = window.setTimeout(() => {
      setActivePosition(nextPosition);
      setIsExiting(false);
    }, EXIT_DURATION_MS);

    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, TRANSITION_DURATION_MS);
  }, [activePosition, isTransitioning, prefersReducedMotion]);

  useEffect(() => {
    if (
      prefersReducedMotion
      || isInteractionPaused
      || isTransitioning
    ) return undefined;

    const rotationTimer = window.setTimeout(() => {
      showBanner((activePosition + 1) % bannerOrder.length);
    }, ROTATION_INTERVAL_MS);

    return () => window.clearTimeout(rotationTimer);
  }, [
    activePosition,
    bannerOrder.length,
    isInteractionPaused,
    isTransitioning,
    prefersReducedMotion,
    showBanner,
  ]);

  const activeBanner = BANNERS[bannerOrder[activePosition]];

  return (
    <section className={styles.section} aria-labelledby="social-proof-title">
      <div className={styles.inner}>
        <h2 id="social-proof-title" className="landing-sr-only">Why teams choose Autobase</h2>
        <div
          className={`${styles.banner} ${isTransitioning ? styles.transitioning : ''}`}
          onMouseEnter={() => setIsInteractionPaused(true)}
          onMouseLeave={() => setIsInteractionPaused(false)}
          onFocusCapture={() => setIsInteractionPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsInteractionPaused(false);
            }
          }}
        >
          <div
            key={activeBanner.id}
            className={`${styles.slide} ${isExiting ? styles.exiting : ''}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <div className={styles.text}>
              <p className={styles.before}>
                {activeBanner.beforeAccent && (
                  <span className={styles.inlineAccent}>{activeBanner.beforeAccent} </span>
                )}
                {activeBanner.before}
              </p>
              {activeBanner.after && (
                <p className={styles.after}>{activeBanner.after}</p>
              )}
              <span className={styles.underbar} />
            </div>

            <BannerVisual type={activeBanner.visual} />
          </div>

          <div className={styles.controls} aria-label="Social proof banners">
            {bannerOrder.map((bannerIndex, position) => (
              <button
                key={BANNERS[bannerIndex].id}
                type="button"
                className={`${styles.indicator} ${position === activePosition ? styles.activeIndicator : ''}`}
                onClick={() => showBanner(position)}
                aria-label={`Show banner ${position + 1} of ${BANNERS.length}`}
                aria-pressed={position === activePosition}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
