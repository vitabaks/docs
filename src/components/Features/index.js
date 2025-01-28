import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Easy to manage',
    description: (
      <>
        A user-friendly web interface that simplifies complex database management tasks.
        Reduce operational overhead, minimize human errors, and streamline workflows.
      </>
    ),
    lightImage: require('@site/static/img/user-interface.png').default,
    darkImage: require('@site/static/img/user-interface.png').default,
    reverse: true,
  },
  {
    title: 'Data security',
    description: (
      <>
        Built-in encryption, access management, and automated backups (PITR) protect your data from leaks, unauthorized access, and data loss.
      </>
    ),
    lightImage: require('@site/static/img/data-security.png').default,
    darkImage: require('@site/static/img/data-security.png').default,
    reverse: false,
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
    reverse: true,
  },
  {
    title: 'Full Automation, No manual actions',
    description: (
      <>
        Autobase eliminates the need for manual database management by automating deployment, failover, backups, restores, upgrades, and scaling.
        Reduces the burden on specialists, allowing them to focus on strategically important tasks.
      </>
    ),
    lightImage: require('@site/static/img/automate.png').default,
    darkImage: require('@site/static/img/automate.png').default,
    reverse: false,
  },
  {
    title: 'Full control, No vendor lock-In',
    description: (
      <>
        Autobase deploys High-Availability PostgreSQL clusters on your servers or the cloud provider of your choice, 
        giving you complete control over your database infrastructure without vendor lock-in.
      </>
    ),
    lightImage: require('@site/static/img/light-bulb.png').default,
    darkImage: require('@site/static/img/light-bulb.png').default,
    reverse: true,
  },
  {
    title: 'Cost Effective',
    description: (
      <>
       Save up to 40% - 80% compared to cloud vendors.
       Autobase eliminates the overhead costs of managed database services while providing the same level of reliability and automation.
      </>
    ),
    lightImage: require('@site/static/img/cost.png').default,
    darkImage: require('@site/static/img/cost.png').default,
    reverse: false,
  },
  {
    title: 'Extensibility',
    description: (
      <>
        PostgreSQL is highly extensible.
        With our automated database platform, you can easily install any of the 300+ available <a href="/docs/extensions/list" target="_blank" rel="noopener noreferrer">extensions </a>
        to equip your database with powerful capabilities tailored to your project’s unique requirements.
      </>
    ),
    lightImage: require('@site/static/img/extension.png').default,
    darkImage: require('@site/static/img/extension.png').default,
    reverse: true,
  },
  {
    title: 'Infrastructure as Code, GitOps',
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
    title: 'DBA as a Service (DBAaaS)',
    description: (
      <>
      In addition to automation tools, Autobase provides access to dedicated PostgreSQL experts.
      Whether you need consultation, optimization, or full database management, our DBAs ensure your infrastructure runs smoothly and efficiently.
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
