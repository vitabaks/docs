import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import styles from './styles.module.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function About() {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // External links for easier management
  const postgresqlLink = "https://www.postgresql.org";
  const dbmsOfYearLink = "https://db-engines.com/en/blog_post/106";
  const dbEnginesTrendLink = "https://db-engines.com/en/ranking_trend";
  const stackoverflowTrendLink = "https://survey.stackoverflow.co/2024/technology#most-popular-technologies-database-prof";
  const autobaseLink = "https://github.com/vitabaks/autobase";

  // Data for the top 10 databases chart
  const data = {
    labels: ['PostgreSQL', 'MySQL', 'SQLite', 'Microsoft SQL Server', 'MongoDB', 'Redis', 'MariaDB', 'Elasticsearch', 'Oracle', 'Dynamodb'],
    datasets: [
      {
        label: 'Usage (%)',
        data: [51.9, 39.4, 32.1, 27.1, 25.2, 22.8, 17.1, 14.3, 10.3, 9.2],
        backgroundColor: '#336791',
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
      y: {
        ticks: {
          padding: 10,
          font: {
            size: 14,
          },
        },
      },
    },
  };

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
      PostgreSQL is used by 52% of professional developers and is the most popular database for the second year in a row. Source: <a href={stackoverflowTrendLink} target="_blank" rel="noopener noreferrer">Stack Overflow - Most popular technologies</a>.
      </p>
      {/* Bar chart for top 10 databases */}
      <div className="scroll-reveal" style={{ maxWidth: '650px', margin: '0 auto', paddingBottom: '2rem' }}>
        <Bar data={data} options={options} />
      </div>
      <p className={`${styles.description} scroll-reveal`}>
      PostgreSQL is an outstanding database, but unlike commercial solutions, it lacks built-in tools for high availability (auto-failover), monitoring dashboards, and a graphical management console.
      While this may seem like a limitation, the open-source ecosystem offers flexible solutions to meet these needs.
      However, integrating these tools into a robust enterprise cluster requires significant PostgreSQL expertise to ensure a reliable, production-ready solution.
      </p>
      <p className={`${styles.description} scroll-reveal`}>
        To bridge this gap, the <a href={autobaseLink} target="_blank" rel="noopener noreferrer">automation toolkit</a>  was developed in 2019 for personal use, and later shared with the community.
        It handles the deployment of high-availability clusters (based on Patroni) and addresses management tasks such as minor and major upgrades, backup configuration with support for automated restore a database to a point in time (PITR), and cluster scaling with horizontal read load distribution across replicas, among many other features.
        The project has been around for over 5 years and is used by companies worldwide. It continues to actively evolve and improve, leveraging the practical experience of PostgreSQL experts (DBA) who use our product to manage database clusters in production environments for mission-critical, high-load databases.
      </p>
      <p className={`${styles.description} ${styles.smallText} scroll-reveal`}>
        The project is solely funded by sponsors who choose to support it voluntarily or to gain access to personalized support.
      </p>
    </section>
  );
}
