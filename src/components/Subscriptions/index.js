import React from 'react';
import styles from './styles.module.css';

const Plans = [
  {
    title: 'Basic',
    price: '$300/month',
    features: [
      'Response time: 12-48 hours',
      'Up to 2 clusters',
      'Basic Personalized support',
    ],
    description:
      'For individual developers and hobby projects that require infrequent but reliable personal support.',
    link: '/docs/sponsor',
    buttonText: 'Get Started',
    isMail: false,
  },
  {
    title: 'Standard',
    price: '$1000/month',
    features: [
      'Response time: 4-12 hours',
      'Up to 10 clusters',
      'Personalized support (PostgreSQL Consulting)',
    ],
    description:
      'For small businesses and startups looking to ensure continuous maintenance and support for their database clusters.',
    link: '/docs/sponsor',
    buttonText: 'Get Started',
    isMail: false,
  },
  {
    title: 'Professional',
    price: '$2500/month',
    features: [
      'Response time: 1-4 hours',
      'Up to 100 clusters',
      'Extended Personalized support (PostgreSQL Expert Consulting)',
    ],
    description:
      'For organizations, that face unique challenges in managing large-scale, high-load databases or numerous database clusters.',
    link: '/docs/sponsor',
    buttonText: 'Get Started',
    isMail: false,
  },
];

function Plan({ title, price, features, description, link, buttonText, isMail }) {
  return (
    <div className={styles.planCard}>
      <h3 className={styles.planTitle}>{title}</h3>
      <p className={styles.planPrice}>{price}</p>
      <ul className={styles.planFeatures}>
        {features.map((feature, idx) => (
          <li key={idx}>
            <span className={styles.checkIcon}>✔</span> {feature}
          </li>
        ))}
      </ul>
      <p className={styles.planDescription}>{description}</p>
      <div className={styles.planButtonContainer}>
        <a
          href={link}
          target={isMail ? '' : '_blank'}
          rel={isMail ? '' : 'noopener noreferrer'}
          className={styles.planButton}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default function SubscriptionPlans() {
  return (
    <section style={{ marginTop: '60px' }}>
      <h1 className={styles.pricingHeader}>Pricing</h1>
      <p className={styles.pricingIntro}>
        Each subscription package includes a <strong>DBA as a Service (DBAaaS)</strong>, providing your database cluster with a dedicated PostgreSQL expert (DBA).
        You will get access to a private Slack channel for direct communication and support.
      </p>
      <div className={styles.plansContainer}>
        {Plans.map((plan, idx) => (
          <Plan key={idx} {...plan} />
        ))}
      </div>
      <div className={styles.enterpriseTextContainer}>
      <p className={styles.enterpriseFooterText}>
        Need <strong>Enterprise</strong> support? For large organizations, we offer personalized support packages for complex database infrastructures, 
        including ultra-fast response times, 24/7 support, remote DBA, regular health checks, performance optimization, and database cluster management (upon request). 
        Please <a href="mailto:info@autobase.tech">contact us</a> for more details.
      </p>
      </div>
    </section>
  );
}
