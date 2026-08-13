import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const plans = [
  {
    id: 'free',
    name: 'Free',
    image: '/img/pricing/header-free.png',
    price: 0,
    billing: 'per month',
    features: [
      'MIT License',
      { label: 'Limited platform functionality', supported: false },
      { label: 'No support included', supported: false },
    ],
    cta: 'Try Free',
    href: 'https://github.com/autobase-tech/autobase/blob/main/README.md#getting-started',
  },
  {
    id: 'standard',
    name: 'Standard',
    image: '/img/pricing/header-standard.png',
    price: 256,
    billing: 'per month',
    features: [
      'Commercial license',
      'Up to 2 clusters',
      'Up to 1 DBA hour included',
      'SLA: up to 24 hours (5×8)',
    ],
    cta: 'Start now',
    href: '/docs#getting-started',
  },
  {
    id: 'professional',
    name: 'Professional',
    image: '/img/pricing/header-professional.png',
    price: 1024,
    billing: 'per month',
    popular: true,
    features: [
      'Commercial license',
      'Up to 10 clusters',
      'Up to 5 DBA hours included',
      'SLA: up to 8 hours (5×8)',
    ],
    cta: 'Launch production',
    href: '/docs#getting-started',
  },
  {
    id: 'premium',
    name: 'Premium',
    image: '/img/pricing/header-premium.png',
    price: 4096,
    billing: 'per month',
    premium: true,
    features: [
      'Commercial license',
      'Unlimited clusters',
      'Up to 15 DBA hours included',
      'SLA: up to 1 hour (7×24)',
    ],
    cta: 'Scale with Autobase',
    href: '/docs#getting-started',
  },
];

export default function PricingSection() {
  const [monthly, setMonthly] = useState(true);
  const getDisplayedPrice = (price) => (monthly ? price : price * 11);
  const getBillingLabel = () =>
    monthly ? 'per month' : 'per year';
  const renderCta = (plan) => {
    const isExternal = plan.href.startsWith('http');
    const content = (
      <>
        <span className={styles.ctaPrompt}>&gt;</span>
        <span className={styles.ctaText}>{plan.cta}</span>
      </>
    );

    if (isExternal) {
      return (
        <a href={plan.href} className={styles.cta} target="_blank" rel="noreferrer">
          {content}
        </a>
      );
    }

    return (
      <Link to={plan.href} className={styles.cta}>
        {content}
      </Link>
    );
  };

  return (
    <section className={styles.section}>

      {/* ── Heading ── */}
      <div className={styles.hero}>
        <h2 className={styles.heading}>Pricing</h2>
        <p className={styles.subtitle}>
          You are not buying a tool. You are buying a{' '}
          <span className={styles.orange}>system</span>.
        </p>
      </div>

      {/* ── Billing switcher (placeholder) ── */}
      <div className={styles.switcherWrap}>
        <p className={styles.billingLabel}>Billing period</p>
        <div className={styles.switcher}>
          <button
            className={clsx(styles.switchBtn, !monthly && styles.switchBtnActive)}
            onClick={() => setMonthly(false)}
          >
            Paid yearly
          </button>
          <button
            className={clsx(styles.switchBtn, monthly && styles.switchBtnActive)}
            onClick={() => setMonthly(true)}
          >
            Paid monthly
          </button>
        </div>
      </div>

      {/* ── Cards ── */}
      <div className={styles.cardsRow}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={clsx(styles.card, plan.popular && styles.cardPopular, plan.premium && styles.cardPremium)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.planId}>/{plan.id}</span>
              {plan.popular && (
                <span className={styles.popularBadge}>Most popular</span>
              )}
            </div>

            {/* Body */}
            <div className={styles.cardBody}>
              <p className={styles.planName}>{plan.name}</p>

              <div className={styles.priceBlock}>
                {plan.price !== undefined ? (
                  <>
                    <p className={styles.price}>
                      <span className={styles.currency}>$</span>
                      {getDisplayedPrice(plan.price)}
                    </p>
                    <p className={styles.billing}>{getBillingLabel()}</p>
                  </>
                ) : null}
              </div>

              <ul className={styles.featureList}>
                {plan.features.map((feature) => {
                  const isSupported = typeof feature === 'string' || feature.supported !== false;
                  const label = typeof feature === 'string' ? feature : feature.label;

                  return (
                    <li key={label} className={styles.featureItem}>
                      <span className={styles.checkIcon} aria-hidden="true">
                        {isSupported ? '✓' : '−'}
                      </span>
                      <span>{label}</span>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.ctaWrap}>
                {renderCta(plan)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Notes ── */}
      <div className={styles.notes}>
        <div className={styles.noteItem}>
          <span className={styles.notePrompt} aria-hidden="true">i</span>
          <span>1 month free with annual billing</span>
        </div>
        <div className={styles.noteItem}>
          <span className={styles.notePrompt} aria-hidden="true">i</span>
          <span>additional DBA hours: $300/hour</span>
        </div>
        <div className={styles.noteItem}>
          <img src="/img/pricing/stripe-logo.png" alt="Stripe" className={styles.stripeLogo} />
          <span>All-in-one Payment management</span>
        </div>
      </div>

    </section>
  );
}
