import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Full control, No vendor lock-In',
    description: (
      <>
        Autobase deploys PostgreSQL clusters on your servers or the cloud provider of your choice, 
        giving you complete control over your database infrastructure without vendor lock-in.
      </>
    ),
    lightImage: require('@site/static/img/light-bulb.png').default,
    darkImage: require('@site/static/img/light-bulb.png').default,
    reverse: false,
  },
  {
    title: 'Full Automation, No manual actions',
    description: (
      <>
        Autobase eliminates the need for manual database management by automating deployment, failover, backups, restores, upgrades, and scaling.
        Focus on your business while Autobase handles the rest.
      </>
    ),
    lightImage: require('@site/static/img/automate.png').default,
    darkImage: require('@site/static/img/automate.png').default,
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

export default function Extensibility() {
  const { colorMode } = useColorMode();
  const [currentMode, setCurrentMode] = useState(null);

  useEffect(() => {
    setCurrentMode(colorMode);
  }, [colorMode]);

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
