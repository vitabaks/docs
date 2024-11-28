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
    link: 'https://github.com/vitabaks/autobase/issues/new',
    buttonText: 'Open issue',
    isMail: false,
  },
  {
    title: 'Small Sponsor',
    price: '$300/month',
    description: [
      'Response time: 12-48 hours',
      'Basic Personalized support',
      'For individuals and hobby projects that require infrequent but reliable personal support.',
    ],
    link: '/docs/sponsor',
    buttonText: 'Start now',
    isMail: false,
  },
  {
    title: 'Sponsor',
    price: '$1000/month',
    description: [
      'Response time: 4-12 hours',
      'Personalized support (PostgreSQL Consulting)',
      'For small businesses and startups looking to ensure continuous maintenance and support for their database clusters',
    ],
    link: '/docs/sponsor',
    buttonText: 'Start now',
    isMail: false,
  },
  {
    title: 'Sponsor+',
    price: '$2500/month',
    description: [
      'Response time: 1-4 hours',
      'Extended Personalized support (PostgreSQL Expert Consulting)',
      'For organizations, that face unique challenges in managing large-scale, high-load databases or numerous database clusters',
    ],
    link: '/docs/sponsor',
    buttonText: 'Start now',
    isMail: false,
  },
];

function Plan({ title, price, description, link, buttonText, isMail }) {
  return (
    <div className={styles.planCard}>
      <h3 className={styles.planTitle}>{title}</h3>
      <p className={styles.planPrice}>{price}</p>
      <ul className={styles.planDescription}>
        {description.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
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
    <section>
      <h1 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Support Subscription Plans</h1>
      <p style={{ textAlign: 'center' }}>
        Support is available by subscription for project sponsors, with access to a private Slack channel for direct assistance.
      </p>
      <div className={styles.plansContainer}>
        {Plans.map((plan, idx) => (
          <Plan key={idx} {...plan} />
        ))}
      </div>
      <div className={styles.enterpriseTextContainer}>
      <p className={styles.enterpriseFooterText}>
        Need <strong>Enterprise</strong> support? For large organizations, we offer personalized support packages for complex database infrastructures, 
        including ultra-fast response times, 24/7 support, remote DBA, regular health checks, and database cluster management (upon request). 
        Please <a href="mailto:info@autobase.tech">contact us</a> for more details.
      </p>
      </div>
    </section>
  );
}
