import React, { useEffect } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'High-Availability (24/7 Uptime)',
    borderColor: '#f39c12',
    description: (
      <>
        Ensure uninterrupted operation of your PostgreSQL databases with built-in replication and automated failover.
        Our solution guarantees minimal downtime, protecting your data from unexpected failures and ensuring continuous service availability.
      </>
    ),
  },
  {
    title: 'Automated Self-Managed Database',
    borderColor: '#a3a1fb',
    description: (
      <>
        A powerful alternative to cloud-managed databases like Amazon RDS, Google Cloud SQL, Azure Database, and others — with a fully automated, self-managed database.
        Optimize performance, reduce costs, and gain full control over your infrastructure and data.
      </>
    ),
  },
  {
    title: 'Enterprise-ready, Cloud and On-Premises',
    borderColor: '#58a6ff',
    description: (
      <>
        Deploy and manage production-ready PostgreSQL clusters across any infrastructure — physical servers, VMs, on-premises, or cloud.
        Enjoy multi-cloud Postgres without vendor lock-in, giving you complete control and scalability.
      </>
    ),
  },
];

function Feature({ title, description, borderColor, idx }) {
  return (
    <div className={clsx('col col--4', `scroll-reveal-${idx}`, styles.featureItem)}>
      <div className={styles.featureContent} style={{ '--border-color': borderColor }}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('scrollreveal').then(({ default: ScrollReveal }) => {
        // Iterate over each feature and apply ScrollReveal
        FeatureList.forEach((_, idx) => {
          ScrollReveal().reveal(`.scroll-reveal-${idx}`, {
            distance: '20px',
            origin: 'bottom',
            opacity: 0,
            duration: 500,
            delay: 300 * idx, // delay for each feature
            easing: 'ease-in-out',
            reset: false,
          });
        });
      });
    }
  }, []);

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
