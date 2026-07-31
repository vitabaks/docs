import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles.module.css';

const ROTATION_INTERVAL_MS = 6500;
const EXIT_DURATION_MS = 340;
const TRANSITION_DURATION_MS = 1200;
const GITHUB_REPO_URL = 'https://github.com/autobase-tech/autobase';
const GITHUB_REPO_API = 'https://api.github.com/repos/autobase-tech/autobase';
const GITHUB_STARS_FALLBACK = 4300;
const GITHUB_STARS_CACHE_KEY = 'autobase-github-stars';
const GITHUB_STARS_CACHE_TTL_MS = 15 * 60 * 1000;
const EXTENSION_NAMES = ['postgis', 'vector', 'timescaledb', 'pg_partman', 'pg_cron', 'pgaudit'];
// Autobase was initially released Oct 8, 2019 (JavaScript months are zero-based).
const AUTOBASE_INITIAL_RELEASE_DATE = {year: 2019, month: 9, day: 8};
const PRODUCTION_AGE_REFRESH_MS = 60 * 60 * 1000;

const BANNERS = [
  {
    id: 'time-to-value',
    before: '1 Month of Infrastructure Work',
    after: '10 Minutes in Autobase',
    visual: 'time-to-value',
  },
  {
    id: 'production-history',
    before: '',
    after: 'in Production',
    afterColor: 'text',
    visual: 'production-history',
  },
  {
    id: 'open-source',
    before: 'Open source forever',
    after: null,
    subtitleAccent: 'Trusted',
    subtitle: 'by teams worldwide',
    visual: 'open-source',
  },
  {
    id: 'extensions',
    beforeAccent: '500+',
    before: 'Extensions',
    after: null,
    subtitle: 'Go beyond vanilla PostgreSQL',
    visual: 'extensions',
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

function getProductionHistory(date = new Date()) {
  const currentYear = date.getUTCFullYear();
  const currentMonth = date.getUTCMonth();
  const currentDay = date.getUTCDate();
  let elapsedMonths =
    (currentYear - AUTOBASE_INITIAL_RELEASE_DATE.year) * 12
    + currentMonth
    - AUTOBASE_INITIAL_RELEASE_DATE.month;

  if (currentDay < AUTOBASE_INITIAL_RELEASE_DATE.day) elapsedMonths -= 1;

  return {
    currentYear,
    years: Math.floor(elapsedMonths / 12),
    months: elapsedMonths % 12,
  };
}

function formatProductionAge({years, months}) {
  const yearLabel = `${years} ${years === 1 ? 'Year' : 'Years'}`;
  if (months === 0) return yearLabel;

  return `${yearLabel} · ${months} ${months === 1 ? 'Month' : 'Months'}`;
}

function useProductionHistory() {
  const [history, setHistory] = useState(() => getProductionHistory());

  useEffect(() => {
    const refreshTimer = window.setInterval(() => {
      setHistory(getProductionHistory());
    }, PRODUCTION_AGE_REFRESH_MS);

    return () => window.clearInterval(refreshTimer);
  }, []);

  return history;
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

function useGithubStars() {
  const [stars, setStars] = useState({count: GITHUB_STARS_FALLBACK, isLive: false});

  useEffect(() => {
    const controller = new AbortController();

    try {
      const cachedValue = window.sessionStorage.getItem(GITHUB_STARS_CACHE_KEY);
      const cached = cachedValue ? JSON.parse(cachedValue) : null;

      if (
        Number.isInteger(cached?.count)
        && Date.now() - cached.timestamp < GITHUB_STARS_CACHE_TTL_MS
      ) {
        setStars({count: cached.count, isLive: true});
        return () => controller.abort();
      }
    } catch {
      // Storage can be unavailable in privacy-focused browser modes.
    }

    fetch(GITHUB_REPO_API, {
      headers: {Accept: 'application/vnd.github+json'},
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API responded with ${response.status}`);
        return response.json();
      })
      .then((repository) => {
        if (!Number.isInteger(repository.stargazers_count)) return;

        setStars({count: repository.stargazers_count, isLive: true});

        try {
          window.sessionStorage.setItem(GITHUB_STARS_CACHE_KEY, JSON.stringify({
            count: repository.stargazers_count,
            timestamp: Date.now(),
          }));
        } catch {
          // The live value still works even when it cannot be cached.
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setStars({count: GITHUB_STARS_FALLBACK, isLive: false});
        }
      });

    return () => controller.abort();
  }, []);

  return stars;
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

function BannerVisual({type, githubStars, productionHistory}) {
  if (type === 'production-history') {
    return (
      <div className={styles.productionTimeline} aria-hidden="true">
        <div className={styles.timelineYears}>
          <span>{AUTOBASE_INITIAL_RELEASE_DATE.year}</span>
          <span>{productionHistory.currentYear}</span>
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

  if (type === 'open-source') {
    const formattedStars = githubStars.count.toLocaleString('en-US');
    const displayedStars = githubStars.isLive ? formattedStars : `${formattedStars}+`;

    return (
      <a
        className={styles.githubProof}
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Autobase on GitHub, ${displayedStars} stars`}
      >
        <span className={styles.githubMetric}>
          <strong className={styles.starCount}>{displayedStars}</strong>
          <span className={styles.starLabel}>GitHub Stars</span>
        </span>
      </a>
    );
  }

  if (type === 'extensions') {
    return (
      <a
        className={styles.extensionCatalog}
        href="/docs/extensions/list"
        aria-label="Browse more than 500 PostgreSQL extensions"
      >
        <span className={styles.catalogHeader}>
          <b>&gt;</b> EXTENSION CATALOG
        </span>
        <span className={styles.extensionGrid}>
          {EXTENSION_NAMES.map((extension, index) => (
            <span
              key={extension}
              className={index === 1 ? styles.featuredExtension : undefined}
            >
              {extension}
            </span>
          ))}
        </span>
      </a>
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
  const githubStars = useGithubStars();
  const productionHistory = useProductionHistory();

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
  const activeBeforeAccent = activeBanner.id === 'production-history'
    ? formatProductionAge(productionHistory)
    : activeBanner.beforeAccent;

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
                {activeBeforeAccent && (
                  <span className={styles.inlineAccent}>{activeBeforeAccent} </span>
                )}
                {activeBanner.before}
              </p>
              {activeBanner.after && (
                <p className={`${styles.after} ${activeBanner.afterColor === 'text' ? styles.afterText : ''}`}>
                  {activeBanner.after}
                </p>
              )}
              {activeBanner.subtitle && (
                <p className={styles.subtitle}>
                  {activeBanner.subtitleAccent && (
                    <span className={styles.subtitleAccent}>{activeBanner.subtitleAccent} </span>
                  )}
                  {activeBanner.subtitle}
                </p>
              )}
              <span className={styles.underbar} />
            </div>

            <BannerVisual
              type={activeBanner.visual}
              githubStars={githubStars}
              productionHistory={productionHistory}
            />
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
