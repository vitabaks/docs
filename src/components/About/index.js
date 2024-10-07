import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function About() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // External links for easier management
  const postgresqlLink = "https://www.postgresql.org";
  const dbmsOfYearLink = "https://db-engines.com/en/blog_post/106";
  const dbEnginesTrendLink = "https://db-engines.com/en/ranking_trend";
  const postgresqlClusterLink = "https://github.com/vitabaks/postgresql_cluster";

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
          reset: true,
        });
      });
    }
  }, []);

  return (
    <section className={`${styles.aboutSection}`}>
      <h3 className={`${styles.subTitle}`}>HOW IT WORKS</h3>
      <h2 className={`${styles.sectionTitle}`}>Open Source Relational Database</h2>
      <p className={`${styles.description} scroll-reveal`}>
        <a href={postgresqlLink} target="_blank" rel="noopener noreferrer">PostgreSQL</a> is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
        More and more companies around the world are choosing it for their new products, or migrating from other database systems to PostgreSQL. 
        It has been ranked as the <a href={dbmsOfYearLink} target="_blank" rel="noopener noreferrer"> DBMS of the Year</a> multiple times, and its popularity continues to grow, as illustrated by the 
        <a href={dbEnginesTrendLink} target="_blank" rel="noopener noreferrer"> DB-Engines ranking trend</a>:
      </p>
      <img src="/img/db-engines-ranking.png" alt="DB-Engines Ranking Trend" className={`${styles.thumbnail} scroll-reveal`} onClick={toggleModal} />
      {isModalOpen && (
        <div className={`${styles.modal} scroll-reveal`} onClick={toggleModal}>
          <div className={styles.modalContent}>
            <button onClick={toggleModal} className={styles.closeButton} aria-label="Close Modal">×</button>
            <img src="/img/db-engines-ranking.png" alt="DB-Engines Ranking Trend - Full Size" className={styles.fullImage} />
          </div>
        </div>
      )}
      <p className={`${styles.description} scroll-reveal`}>
        PostgreSQL is an outstanding database; however, unlike commercial DBMS solutions, it doesn’t include built-in tools for high availability, monitoring dashboards, or a graphical management console commonly found in commercial offerings.
        While this might be seen as a drawback, it can also be an advantage, since the open-source world offers various ways to tackle these tasks.
        There are numerous open-source tools available, but combining them into a reliable, Enterprise-ready database cluster requires solid experience with PostgreSQL and these tools to create a truly dependable solution ready for production.
      </p>
      <p className={`${styles.description} scroll-reveal`}>
        To bridge this gap, the <a href={postgresqlClusterLink} target="_blank" rel="noopener noreferrer">postgresql_cluster</a> automation toolkit was developed in 2019 for personal use, and later shared with the community.
        It handles the deployment of high-availability clusters (using Patroni) and addresses management tasks such as minor and major upgrades, backup configuration with support for automated restore a database to a point in time (PITR), and cluster scaling with horizontal read load distribution across replicas, among many other features.
        The project has been around for over 5 years and is used by companies worldwide. It continues to actively evolve and improve, leveraging the practical experience of PostgreSQL experts (DBA) who utilize our product to manage database clusters in production environments for mission-critical, high-load databases.
      </p>
      <p className={`${styles.description} scroll-reveal`}>
        This is not a fork; it is 100% PostgreSQL. It is not a cloud service (SaaS/DBaaS) that requires additional fees. It is a 100% free solution, available for commercial use under the MIT license.
      </p>
      <p className={`${styles.description} ${styles.smallText} scroll-reveal`}>
        The project is solely funded by sponsors who choose to support it voluntarily or to gain access to personalized support.
      </p>
    </section>
  );
}
