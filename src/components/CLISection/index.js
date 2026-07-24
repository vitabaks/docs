import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

/* ── Getting-started workflow (inline terminal) ─────────────────────── */
const SEQUENCES = [
  {
    command: '$ curl -fsSL https://autobase.tech/platform.yml \\\n    --output ./docker-compose.platform.yml',
    result:  '✓ Downloaded',
    detail:  '  ./docker-compose.platform.yml',
  },
  {
    command: '$ docker compose \\\n    -f docker-compose.platform.yml up -d',
    result:  '✓ Autobase Console started',
    detail:  '  http://your-server-address',
  },
];

const CLEAR_CMD  = '\n$ \\! clear';
const CHAR_SPEED = 28;
const CLS_SPEED  = 90;
const HOLD_MS    = 2600;
const FLASH_MS   = 420;

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

function useElementInView(elementRef) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef]);

  return isInView;
}

/* ── Inline terminal body (cycles SEQUENCES) ──────────────────────── */
function InlineBody({ typed, clsTyped, phase, seq }) {
  const showResult = phase === 'showing' || phase === 'typing_cls' || phase === 'flash';
  const showCls    = phase === 'typing_cls' || phase === 'flash';
  const isFlashing = phase === 'flash';
  const displayText = typed.startsWith('$ ') ? typed.slice(2) : typed;

  return (
    <pre className={`${styles.terminalCode} ${isFlashing ? styles.terminalFlash : ''}`}>
      <span className={styles.prompt}>$</span>
      {' '}
      {displayText}
      {phase === 'typing' && <span className={styles.caret}>_</span>}
      {showResult && (
        <>
          {'\n\n'}
          <span className={styles.success}>{seq.result}</span>
          {'\n'}
          <span className={styles.dimmed}>{seq.detail}</span>
        </>
      )}
      {showCls && (
        <>
          {'\n'}
          <span className={styles.dimmed}>{clsTyped}</span>
          {phase === 'typing_cls' && clsTyped.length < CLEAR_CMD.length && (
            <span className={styles.caret}>_</span>
          )}
        </>
      )}
    </pre>
  );
}

export default function CLISection() {
  /* ── Inline cycling state ── */
  const [seqIdx,   setSeqIdx]   = useState(0);
  const [typed,    setTyped]    = useState('');
  const [clsTyped, setClsTyped] = useState('');
  const [phase,    setPhase]    = useState('typing');
  const timer = useRef(null);
  const terminalRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isTerminalInView = useElementInView(terminalRef);

  const seq = SEQUENCES[seqIdx];

  /* ── Inline typewriter ── */
  useEffect(() => {
    if (prefersReducedMotion || !isTerminalInView || phase !== 'typing') return undefined;
    clearTimeout(timer.current);
    const cmd = seq.command;
    if (typed.length < cmd.length) {
      timer.current = setTimeout(() => setTyped(cmd.slice(0, typed.length + 1)), CHAR_SPEED);
    } else {
      timer.current = setTimeout(() => setPhase('showing'), 300);
    }
    return () => clearTimeout(timer.current);
  }, [phase, typed, seq.command, prefersReducedMotion, isTerminalInView]);

  useEffect(() => {
    if (prefersReducedMotion || !isTerminalInView || phase !== 'showing') return undefined;
    timer.current = setTimeout(() => { setClsTyped(''); setPhase('typing_cls'); }, HOLD_MS);
    return () => clearTimeout(timer.current);
  }, [phase, prefersReducedMotion, isTerminalInView]);

  useEffect(() => {
    if (prefersReducedMotion || !isTerminalInView || phase !== 'typing_cls') return undefined;
    clearTimeout(timer.current);
    if (clsTyped.length < CLEAR_CMD.length) {
      timer.current = setTimeout(() => setClsTyped(CLEAR_CMD.slice(0, clsTyped.length + 1)), CLS_SPEED);
    } else {
      timer.current = setTimeout(() => setPhase('flash'), 180);
    }
    return () => clearTimeout(timer.current);
  }, [phase, clsTyped, prefersReducedMotion, isTerminalInView]);

  useEffect(() => {
    if (prefersReducedMotion || !isTerminalInView || phase !== 'flash') return undefined;
    timer.current = setTimeout(() => {
      setTyped(''); setClsTyped('');
      setSeqIdx(i => (i + 1) % SEQUENCES.length);
      setPhase('typing');
    }, FLASH_MS);
    return () => clearTimeout(timer.current);
  }, [phase, prefersReducedMotion, isTerminalInView]);

  const visibleTyped = prefersReducedMotion ? seq.command : typed;
  const visiblePhase = prefersReducedMotion ? 'showing' : phase;

  const bar = (
    <div className={styles.terminalBar}>
      <span className={styles.dot} /><span className={styles.dot} /><span className={styles.dot} />
    </div>
  );

  return (
    <section className={styles.section} aria-labelledby="get-started-title">
      <div className={styles.inner}>
        <h2 id="get-started-title" className="landing-sr-only">Get started with Autobase</h2>
        <div className={styles.layout}>

          <div ref={terminalRef} className={styles.terminal}>
            {bar}
            <InlineBody typed={visibleTyped} clsTyped={clsTyped} phase={visiblePhase} seq={seq} />
          </div>

          <div className={styles.ctas}>
            <a
              href="/docs#getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaPrimary}
            >
              <span className={styles.ctaArrow}>&gt;</span>
              <div>
                <div className={styles.ctaTitle}>DOWNLOAD PLATFORM</div>
                <div className={styles.ctaSubtitle}>Enterprise Edition · Free Trial 14 Days</div>
              </div>
            </a>
            <a
              href="https://demo.autobase.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaSecondary}
            >
              <span className={styles.ctaArrow}>&gt;</span>
              <div>
                <div className={styles.ctaTitle}>LIVE DEMO</div>
                <div className={styles.ctaSubtitle}>Email & password: demo@autobase.tech</div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
