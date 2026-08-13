import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const DEFAULT_ENGINEERING_COST_PER_MONTH = 8500;
const ENGINEERING_HOURS_PER_MONTH = 160;

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
  const [releasedHours, setReleasedHours] = useState(160);
  const [engineeringCostPerMonth, setEngineeringCostPerMonth] = useState(DEFAULT_ENGINEERING_COST_PER_MONTH);
  const [isEditingEngineeringCost, setIsEditingEngineeringCost] = useState(false);
  const economicsReportUrl = useBaseUrl('/Autobase_PostgreSQL_Economics.pdf');
  const getDisplayedPrice = (price) => (monthly ? price : price * 11);
  const getBillingLabel = () =>
    monthly ? 'per month' : 'per year';
  const premiumMonthlyCost = monthly ? 4096 : (4096 * 11) / 12;
  const engineeringCostPerHour = engineeringCostPerMonth / ENGINEERING_HOURS_PER_MONTH;
  const breakEvenHours = Math.round(premiumMonthlyCost / engineeringCostPerHour);
  const releasedValuePerMonth = releasedHours * engineeringCostPerHour;
  const netBenefitPerYear = Math.max(0, (releasedValuePerMonth - premiumMonthlyCost) * 12);
  const formattedNetBenefit = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(netBenefitPerYear);
  const formattedEngineeringCost = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(engineeringCostPerMonth);
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

      <div className={styles.valueStrip} aria-label="Autobase value highlights">
        <div className={styles.valueItem}>
          <span className={styles.valueNumber}>90%+</span>
          <span className={styles.valueLabel}>less hands-on setup time</span>
        </div>
        <div className={styles.valueItem}>
          <span className={styles.valueNumber}>~77 h</span>
          <span className={styles.valueLabel}>monthly break-even for Premium</span>
        </div>
        <div className={styles.valueItem}>
          <span className={styles.valueNumber}>39–56%</span>
          <span className={styles.valueLabel}>lower infrastructure cost vs managed PostgreSQL</span>
        </div>
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

      <section className={styles.economics} aria-labelledby="economics-heading">
        <div className={styles.economicsIntro}>
          <p className={styles.eyebrow}>The economics</p>
          <h3 id="economics-heading" className={styles.economicsHeading}>
            Run PostgreSQL at scale - without scaling repetitive work.
          </h3>
        </div>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}>
            <p className={styles.comparisonLabel}>Without Autobase</p>
            <p className={styles.comparisonText}>
              Your team builds and maintains the operations layer, or pays more for a managed PostgreSQL service.
            </p>
          </article>
          <article className={clsx(styles.comparisonCard, styles.comparisonCardAccent)}>
            <p className={styles.comparisonLabel}>With Autobase</p>
            <p className={styles.comparisonText}>
              Your database infrastructure is ready to use and kept operational automatically.
            </p>
          </article>
        </div>

        <div className={styles.setupCallout}>
          <div>
            <span className={styles.calloutNumber}>4-5 h</span>
            <span className={styles.calloutLabel}>typical DIY production setup</span>
          </div>
          <span className={styles.calloutArrow} aria-hidden="true">→</span>
          <div>
            <span className={styles.calloutNumber}>10-15 min</span>
            <span className={styles.calloutLabel}>with Autobase</span>
          </div>
        </div>

        <div className={styles.roiCalculator}>
          <div className={styles.calculatorIntro}>
            <p className={styles.eyebrow}>Estimate your return</p>
            <h4 className={styles.calculatorHeading}>What is released engineering time worth?</h4>
            <div className={styles.calculatorDescription}>
              <span>Based on a modeled engineering cost of {formattedEngineeringCost} per month.</span>
              <button
                type="button"
                className={styles.editAssumption}
                onClick={() => setIsEditingEngineeringCost((isEditing) => !isEditing)}
                aria-expanded={isEditingEngineeringCost}
                aria-controls="engineering-cost-input"
              >
                {isEditingEngineeringCost ? 'Done' : 'Edit assumption'}
              </button>
            </div>
            {isEditingEngineeringCost && (
              <label className={styles.costControl} htmlFor="engineering-cost-input">
                <span>Engineering cost / month</span>
                <span className={styles.costInputWrap}>
                  <span aria-hidden="true">$</span>
                  <input
                    id="engineering-cost-input"
                    type="number"
                    min="1"
                    step="100"
                    value={engineeringCostPerMonth}
                    onChange={(event) => setEngineeringCostPerMonth(Math.max(1, Number(event.target.value) || 1))}
                  />
                </span>
              </label>
            )}
          </div>

          <label className={styles.hoursControl} htmlFor="released-hours">
            <span>Engineering hours released per month (up to ~3 full-time engineers)</span>
            <input
              id="released-hours"
              type="range"
              min="0"
              max="480"
              step="1"
              value={releasedHours}
              onChange={(event) => setReleasedHours(Number(event.target.value))}
            />
            <output htmlFor="released-hours">{releasedHours} h</output>
          </label>

          <div className={styles.roiResult} aria-live="polite">
            <span className={styles.roiResultLabel}>
              {releasedHours < breakEvenHours ? 'Hours to break even' : 'Estimated net benefit per year'}
            </span>
            <strong className={styles.roiResultValue}>
              {releasedHours < breakEvenHours ? `${breakEvenHours - releasedHours} h/month` : formattedNetBenefit}
            </strong>
            <span className={styles.roiResultDetail}>
              Premium breaks even at approximately {breakEvenHours} engineering hours per month.
            </span>
          </div>
        </div>

        <div className={styles.economicsFooter}>
          <p className={styles.disclaimer}>
            Modeled estimates only. Results vary by region, topology, storage, IOPS, backups, traffic and discounts.
          </p>
          <a className={styles.reportLink} href={economicsReportUrl} download>
            <span aria-hidden="true">↓</span>
            Download the full economics report (PDF)
          </a>
        </div>
      </section>

    </section>
  );
}
