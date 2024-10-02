import React from 'react';
import styles from './styles.module.css';

const Plans = [
  {
    title: 'FREE',
    price: '$0/month',
    description: [
      'Response time: not guarantee',
      'Community support',
      'Depends on the availability and goodwill of community members',
    ],
  },
  {
    title: 'Sponsor',
    price: '$1000/month',
    description: [
      'Response time: 4-12 hours',
      'Personalized support (PostgreSQL Expert Consulting)',
      'For small businesses and startups looking to ensure continuous maintenance and support for their database clusters',
    ],
  },
  {
    title: 'Sponsor+',
    price: '$2500/month',
    description: [
      'Response time: 1-4 hours',
      'Extended Personalized support (PostgreSQL Expert Consulting)',
      'For organizations, that face unique challenges in managing large-scale, high-load databases or numerous database clusters',
    ],
  },
  {
    title: 'Enterprise',
    price: 'Custom Pricing',
    description: [
      'For large organizations, we offer personalized support packages for complex database infrastructures',
      'Ultra-fast response times and 24/7 support. Remote DBA, regular health checks, and database server management (available upon request)',
    ],
  },
];

function Plan({ title, price, description }) {
  return (
    <div className={styles.planCard}>
      <h3 className={styles.planTitle}>{title}</h3>
      <p className={styles.planPrice}>{price}</p>
      <ul className={styles.planDescription}>
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SubscriptionPlans() {
  return (
    <section>
      <h2 style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>Support Subscription Plans</h2>
      <p style={{ textAlign: 'center', fontSize: '14px' }}>
        Support is available by subscription for project sponsors, with access to a private Slack channel for direct assistance.
      </p>
      <div className={styles.plansContainer}>
        {Plans.map((plan, idx) => (
          <Plan key={idx} {...plan} />
        ))}
      </div>
    </section>
  );
}
