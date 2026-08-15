import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const DEFAULT_ENGINEERING_COST_PER_MONTH = 8500;
const ENGINEERING_HOURS_PER_MONTH = 160;
const WORKFORCE_STEPS = [1, 160, 320, 480];
const INFRASTRUCTURE_COSTS = {
  small: {
    label: '8 vCPU, 32 GB RAM, 500 GB storage',
    providers: [
      { name: 'AWS', managed: 2083, autobase: 949 },
      { name: 'GCP', managed: 1956, autobase: 1105 },
      { name: 'Azure', managed: 1610, autobase: 953 },
      { name: 'DigitalOcean', managed: 1536, autobase: 906 },
    ],
  },
  medium: {
    label: '32 vCPU, 128 GB RAM, 1 TB storage',
    providers: [
      { name: 'AWS', managed: 8095, autobase: 3557 },
      { name: 'GCP', managed: 7154, autobase: 3913 },
      { name: 'Azure', managed: 6217, autobase: 3588 },
      { name: 'DigitalOcean', managed: 5586, autobase: 3324 },
    ],
  },
  large: {
    label: '96 vCPU, 768 GB RAM, 10 TB storage',
    providers: [
      { name: 'AWS', managed: 33748, autobase: 15463 },
      { name: 'GCP', managed: 31127, autobase: 18872 },
      { name: 'Azure', managed: 28530, autobase: 15495 },
    ],
  },
};
const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function PersonIcon() {
  return (
    <svg viewBox="0 0 12 14" aria-hidden="true" focusable="false">
      <circle cx="6" cy="3" r="2.25" />
      <path d="M2 13v-2.5a4 4 0 0 1 8 0V13" />
    </svg>
  );
}

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
  const [engineeringCostInput, setEngineeringCostInput] = useState(String(DEFAULT_ENGINEERING_COST_PER_MONTH));
  const [isEditingEngineeringCost, setIsEditingEngineeringCost] = useState(false);
  const [infrastructureSize, setInfrastructureSize] = useState('medium');
  const economicsReportUrl = useBaseUrl('/Autobase_PostgreSQL_Economics.pdf');
  const getDisplayedPrice = (price) => (monthly ? price : price * 11);
  const getBillingLabel = () =>
    monthly ? 'per month' : 'per year';
  const premiumMonthlyCost = monthly ? 4096 : (4096 * 11) / 12;
  const engineeringCostPerHour = engineeringCostPerMonth / ENGINEERING_HOURS_PER_MONTH;
  const releasedEngineers = Math.min(3, Math.max(1, Math.round(releasedHours / ENGINEERING_HOURS_PER_MONTH)));
  const workforceLabel = releasedHours < ENGINEERING_HOURS_PER_MONTH
    ? '1 engineer'
    : releasedEngineers === 1
      ? '1 full-time engineer'
      : `${releasedEngineers} full-time engineers`;
  const breakEvenHours = Math.round(premiumMonthlyCost / engineeringCostPerHour);
  const releasedValuePerMonth = releasedHours * engineeringCostPerHour;
  const netBenefitPerYear = Math.max(0, (releasedValuePerMonth - premiumMonthlyCost) * 12);
  const formattedNetBenefit = formatCurrency.format(netBenefitPerYear);
  const formattedEngineeringCost = formatCurrency.format(engineeringCostPerMonth);
  const infrastructureProfile = INFRASTRUCTURE_COSTS[infrastructureSize];
  const toggleEngineeringCostEditor = () => {
    if (!isEditingEngineeringCost) {
      setEngineeringCostInput(String(engineeringCostPerMonth));
    }

    setIsEditingEngineeringCost(!isEditingEngineeringCost);
  };
  const updateEngineeringCost = (value) => {
    setEngineeringCostInput(value);

    const parsedValue = Number(value);
    if (value !== '' && Number.isFinite(parsedValue) && parsedValue > 0) {
      setEngineeringCostPerMonth(parsedValue);
    }
  };
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
          <span className={styles.valueNumber}>39-56%</span>
          <span className={styles.valueLabel}>lower infrastructure cost vs Managed Postgres</span>
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
            PostgreSQL is free. Running it at scale is not.
          </h3>
        </div>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}>
            <p className={styles.comparisonLabel}>Without Autobase</p>
            <p className={styles.comparisonText}>
              Your team builds and maintains the operations layer, or pays more for a Managed Postgres service.
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
                onClick={toggleEngineeringCostEditor}
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
                    value={engineeringCostInput}
                    onChange={(event) => updateEngineeringCost(event.target.value)}
                  />
                </span>
              </label>
            )}
          </div>

          <label className={styles.hoursControl} htmlFor="released-hours">
            <span>Engineering hours released per month</span>
            <input
              id="released-hours"
              type="range"
              min="1"
              max="480"
              step="1"
              value={releasedHours}
              onChange={(event) => setReleasedHours(Number(event.target.value))}
            />
            <span className={styles.workforceScale} aria-label="Full-time engineer equivalents based on 160 hours per month">
              {WORKFORCE_STEPS.map((hours) => (
                <span className={styles.workforceStep} key={hours}>
                  <span className={styles.workforceTick} aria-hidden="true" />
                  <span>{hours} h</span>
                </span>
              ))}
            </span>
            <span className={styles.workforceSummary}>
              <output htmlFor="released-hours">{releasedHours} h</output>
              <span className={styles.currentWorkforce}>
                <span className={styles.workforcePeople} aria-hidden="true">
                  {Array.from({ length: releasedEngineers }, (_, index) => <PersonIcon key={index} />)}
                </span>
                <span>{workforceLabel}</span>
              </span>
            </span>
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

          <p className={styles.calculatorContext}>
            This estimates the value of engineering capacity released for product work, not salary savings or headcount reduction.
          </p>
        </div>

        <section className={styles.infrastructureComparison} aria-labelledby="infrastructure-heading">
          <div className={styles.infrastructureHeader}>
            <div>
              <p className={styles.eyebrow}>Infrastructure cost</p>
              <h4 id="infrastructure-heading" className={styles.infrastructureHeading}>
                Managed Postgres vs Autobase
              </h4>
            </div>
            <div className={styles.infrastructureSwitcher} aria-label="Infrastructure size">
              {Object.keys(INFRASTRUCTURE_COSTS).map((size) => (
                <button
                  key={size}
                  type="button"
                  className={clsx(styles.infrastructureSwitchBtn, infrastructureSize === size && styles.infrastructureSwitchBtnActive)}
                  style={infrastructureSize === size ? {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                  } : undefined}
                  onClick={() => setInfrastructureSize(size)}
                  aria-pressed={infrastructureSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.infrastructureSetup}>{infrastructureProfile.label}</p>
          <div className={styles.infrastructureLegend} aria-label="Cost comparison legend">
            <span><i className={styles.managedSwatch} aria-hidden="true" />Managed Postgres</span>
            <span><i className={styles.autobaseSwatch} aria-hidden="true" />Autobase Postgres</span>
          </div>

          <div className={styles.infrastructureRows}>
            {infrastructureProfile.providers.map((provider) => {
              const savingsAmount = provider.managed - provider.autobase;
              const savingsPercentage = Math.round((savingsAmount / provider.managed) * 100);
              const autobaseWidth = (provider.autobase / provider.managed) * 100;

              return (
                <article key={provider.name} className={styles.infrastructureRow}>
                  <p className={styles.providerName}>{provider.name}</p>
                  <div className={styles.costBars}>
                    <div className={styles.costBarGroup}>
                      <div className={styles.costBarTrack} aria-label={`Managed Postgres: ${formatCurrency.format(provider.managed)} per month`}>
                        <span className={styles.managedBar} style={{ width: '100%' }}>
                          <strong className={styles.costBarValue}>{formatCurrency.format(provider.managed)}/mo</strong>
                        </span>
                      </div>
                    </div>
                    <div className={styles.costBarGroup}>
                      <div className={styles.costBarTrack} aria-label={`Autobase Postgres: ${formatCurrency.format(provider.autobase)} per month`}>
                        <span className={styles.autobaseBar} style={{ width: `${autobaseWidth}%` }}>
                          <strong className={styles.costBarValue}>{formatCurrency.format(provider.autobase)}/mo</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.infrastructureSavings}>
                    <strong>-{savingsPercentage}%</strong>
                    <span>{formatCurrency.format(savingsAmount)}/mo less</span>
                  </div>
                </article>
              );
            })}
          </div>
          <p className={styles.infrastructureNote}>
            Infrastructure cost estimates are based on a cluster with one primary and two replicas. Autobase license is not included.
          </p>
        </section>

        <div className={styles.economicsFooter}>
          <a className={styles.reportLink} href={economicsReportUrl} download>
            <span aria-hidden="true">↓</span>
            Download the full economics report (PDF)
          </a>
        </div>
      </section>

    </section>
  );
}
