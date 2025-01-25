import React from 'react';
import styles from './styles.module.css';

const Plans = [
  {
    title: 'Basic',
    price: '$300/month',
    features: [
      'Autobase automation tools',
      'Up to 5 PostgreSQL clusters',
      'PostgreSQL Consulting',
      '1 hour of DBA per month',
      'Support response time: 12-48 hours',
    ],
    description:
      'The basic Autobase package includes assistance with initial deployment and seamless integration into your infrastructure.',
    link: '/docs/sponsor',
    buttonText: 'Get Started',
    isMail: false,
  },
  {
    title: 'Standard',
    price: '$1000/month',
    features: [
      'Autobase automation tools',
      'Up to 20 PostgreSQL clusters',
      'PostgreSQL Consulting',
      'Up to 5 hours of DBA per month',
      'Database Management (upon request)',
      'Support response time: 4-12 hours',
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
      'Autobase automation tools',
      'Up to 100 PostgreSQL clusters',
      'PostgreSQL Consulting',
      'Up to 10 hours of DBA per month',
      'Database Management',
      'Monitoring (health checks)',
      'Performance Optimization',
      'Support response time: 1-4 hours',
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
        Each <strong>Autobase</strong> package includes a <strong>DBA as a Service (DBAaaS)</strong>, providing your database cluster with a dedicated PostgreSQL expert (DBA).
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
        including ultra-fast response times, 24/7 support, remote DBA, regular health checks, performance optimization, and database management (upon request). 
        Please <a href="mailto:info@autobase.tech">contact us</a> for more details.
      </p>
      </div>
    </section>
  );
}
