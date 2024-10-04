import React, { useState } from 'react';
import styles from './styles.module.css';

export default function About() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <section className={styles.aboutSection}>
      <h3 className={styles.subTitle}>HOW IT WORKS</h3>
      <h2 className={styles.sectionTitle}>Open Source Relational Database</h2>
      <p className={styles.description}>
        <a href="https://www.postgresql.org" target="_blank" rel="noopener noreferrer">PostgreSQL</a> is a powerful, open source object-relational database system
        with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
        More and more companies around the world are choosing it for their new products, or migrating from other database systems to PostgreSQL. 
        It has been ranked as the <a href="https://db-engines.com/en/blog_post/106" target="_blank" rel="noopener noreferrer"> DBMS of the Year</a> multiple times, and its popularity continues to grow, as illustrated by the 
        <a href="https://db-engines.com/en/ranking_trend" target="_blank" rel="noopener noreferrer"> DB-Engines ranking trend:</a>
      </p>
      <img src="/img/db-engines-ranking.png" alt="DB-Engines Ranking Trend" className={styles.thumbnail} onClick={toggleModal} />
      {isModalOpen && (
        <div className={styles.modal} onClick={toggleModal}>
          <img src="/img/db-engines-ranking.png" alt="DB-Engines Ranking Trend - Full Size" className={styles.fullImage} />
        </div>
      )}
      <p className={styles.description}>
        PostgreSQL is an outstanding database; however, unlike commercial DBMS, it lacks built-in tools for high availability, monitoring, and management.
        While this might be seen as a drawback, it can also be an advantage since the open-source world offers various ways to tackle these tasks.
        There are numerous open-source tools available, but combining them into a reliable, enterprise-ready database cluster requires solid experience with PostgreSQL and these tools to create a truly dependable solution ready for production.
      </p>
      <p className={styles.description}>
        To bridge this gap, the <a href="https://github.com/vitabaks/postgresql_cluster" target="_blank" rel="noopener noreferrer">postgresql_cluster</a> automation toolkit was developed in 2019, at first for personal use but then it was opened to the community.
        It handles the deployment of high-availability clusters (using Patroni) and addresses management tasks such as minor and major upgrades, backup configuration with support for automated cluster recovery to any point in time (PITR), and cluster scaling with horizontal read load distribution across replicas, among many other features.
        The project has been around for over 5 years and is used by companies worldwide. It continues to actively evolve and improve, leveraging the practical experience of PostgreSQL experts (DBA) who utilize our product to manage database clusters in production environments for mission-critical, high-load databases.
        </p>
      <p className={styles.description}>
        This is not a fork it is 100% PostgreSQL, it is not a cloud service (SaaS/DBaaS) that would require additional fees. It is a 100% free solution, available for commercial use under the MIT license.
      </p>
      <p className={styles.description} style={{ fontSize: '14px' }}>
        The project is solely funded by sponsors who choose to support it voluntarily or to gain access to personalized support.
      </p>
    </section>
  );
}
