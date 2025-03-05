import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Automated self-managed database',
    description: (
      <>
        A powerful alternative to cloud-managed databases like Amazon RDS, Google Cloud SQL, and Azure Database—delivering a fully automated, self-managed PostgreSQL experience.
        Autobase automates deployment, failover, backups, restores, upgrades, scaling, amd more, eliminating the need for manual database management.
      </>
    ),
    lightImage: require('@site/static/img/automate.png').default,
    darkImage: require('@site/static/img/automate.png').default,
    reverse: true,
  },
  {
    title: 'Full control without vendor lock-In',
    description: (
      <>
        Your database environment remains fully under your control because both the Autobase and the PostgreSQL clusters it deploys
        run on your own infrastructure—whether on your servers or a cloud provider of your choice—ensuring complete independence from vendor lock-in.
      </>
    ),
    lightImage: require('@site/static/img/light-bulb.png').default,
    darkImage: require('@site/static/img/light-bulb.png').default,
    reverse: false,
  },
  {
    title: 'Cost effective database',
    description: (
      <>
       Save 40% and more vs. cloud-managed databases. Autobase, an open-source DBaaS on your own infrastructure,
       removes extra costs while ensuring the same reliability and automation.
       Pay only for the server resources you use—no vendor markups on your database.
      </>
    ),
    lightImage: require('@site/static/img/cost.png').default,
    darkImage: require('@site/static/img/cost.png').default,
    reverse: true,
  },
  {
    title: 'Easy to manage',
    description: (
      <>
        A user-friendly web interface that simplifies complex database deployment and management tasks.
        Reduce operational overhead, minimize human errors, and streamline workflows effortlessly.
      </>
    ),
    lightImage: require('@site/static/img/user-interface.png').default,
    darkImage: require('@site/static/img/user-interface.png').default,
    reverse: false,
  },
  {
    title: 'Data security',
    description: (
      <>
        Built-in encryption, access management, and automated backups (PITR) ensure data security and compliance,
        protecting your database from leaks, unauthorized access, and data loss. Keep your data safe, recoverable, and always available.
      </>
    ),
    lightImage: require('@site/static/img/data-security.png').default,
    darkImage: require('@site/static/img/data-security.png').default,
    reverse: true,
  },
  {
    title: 'Scalability and performance',
    description: (
      <>
        Designed for businesses of all sizes, Autobase seamlessly adapts to evolving requirements.
        Scale effortlessly with read replicas, ensuring high availability and optimal performance as your workload grows.
      </>
    ),
    lightImage: require('@site/static/img/scalable.png').default,
    darkImage: require('@site/static/img/scalable.png').default,
    reverse: false,
  },
  {
    title: 'Extensibility',
    description: (
      <>
        PostgreSQL is highly extensible.
        With Autobase, you can easily install any of the 400+ available <a href="/docs/extensions/list" target="_blank" rel="noopener noreferrer">extensions </a>
        to equip your database with powerful capabilities tailored to your project’s unique requirements.
      </>
    ),
    lightImage: require('@site/static/img/extension.png').default,
    darkImage: require('@site/static/img/extension.png').default,
    reverse: true,
  },
  {
    title: 'Infrastructure as Code and GitOps',
    description: (
      <>
        Define your database infrastructure with repeatable and consistent configurations.
        <a href="/docs/management/gitops" target="_blank" rel="noopener noreferrer"> GitOps</a> support ensures seamless integration with version control, simplifying management and ensuring full traceability.
      </>
    ),
    lightImage: require('@site/static/img/git.png').default,
    darkImage: require('@site/static/img/git.png').default,
    reverse: false,
  },
  {
    title: 'Professional support',
    description: (
      <>
      Autobase offers DBA as a Service (DBAaaS) with PostgreSQL experts.
      Whether you need consultation, optimization, or full database management, our DBAs ensure smooth and efficient operation of your infrastructure.
      </>
    ),
    lightImage: require('@site/static/img/administrator.png').default,
    darkImage: require('@site/static/img/administrator.png').default,
    reverse: true,
  },
];

export default function Features() {
  const { colorMode } = useColorMode();
  const [currentMode, setCurrentMode] = useState(null);

  useEffect(() => {
    setCurrentMode(colorMode);
  }, [colorMode]);

    // Use ScrollReveal for animations
    useEffect(() => {
      if (typeof window !== 'undefined') {
        import('scrollreveal').then(({ default: ScrollReveal }) => {
          ScrollReveal().reveal('.scroll-reveal', {
            distance: '20px',
            origin: 'bottom',
            opacity: 0,
            duration: 500,
            delay: 300,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            reset: false,
          });
        });
      }
    }, []);

  if (currentMode === null) {
    return null;
  }

  return (
    <section className={styles.featuresSection}>
      <h3 className={styles.subTitle}>FEATURES</h3>
      <h2 className={styles.sectionTitle}>Features and Benefits</h2>
      <div className={styles.contentContainer}>
        {blocks.map((block, index) => (
          <div 
            key={index} 
            className={`${styles.featuresBlock} ${block.reverse ? styles.reverse : ''} scroll-reveal`}
          >
            <div className={styles.featuresImage}>
              <img
                src={currentMode === 'dark' ? block.darkImage : block.lightImage}
                alt={block.title}
              />
            </div>
            <div className={styles.featuresContent}>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <p className={styles.description}>{block.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
