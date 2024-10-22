import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Postgres for AI',
    description: (
      <>
        Leverage <a href="https://github.com/pgvector/pgvector" target="_blank" rel="noopener noreferrer">pgvector</a> and 
        <a href="https://github.com/timescale/pgvectorscale" target="_blank" rel="noopener noreferrer"> pgvectorscale</a> to build and deploy Retrieval Augmented Generation (RAG) applications directly within PostgreSQL. Achieve high-performance embedding search and cost-efficient storage, making PostgreSQL the ideal platform for your AI applications.
      </>
    ),
    lightImage: '/img/vector-search.png',
    darkImage: '/img/vector-search.png',
    reverse: false,
  },
  {
    title: 'Postgres for Search and Analytics',
    description: (
      <>
        <a href="https://paradedb.com" target="_blank" rel="noopener noreferrer">ParadeDB</a>, a modern alternative to Elasticsearch, is built on PostgreSQL to handle real-time, update-heavy workloads. Optimize your search and analytics processes with PostgreSQL’s reliability and flexibility.
      </>
    ),
    lightImage: '/img/paradedb.png',
    darkImage: '/img/paradedb.png',
    reverse: true,
  },
  {
    title: 'Postgres for Time-Series Data',
    description: (
      <>
        Harness the power of <a href="https://www.timescale.com/" target="_blank" rel="noopener noreferrer">TimescaleDB</a>, a leading time-series extension for PostgreSQL. Store, query, and analyze time-series data efficiently, all within your PostgreSQL database.
      </>
    ),
    lightImage: '/img/timescaledb.png',
    darkImage: '/img/timescaledb.dark.png',
    reverse: false,
  },
  {
    title: 'Postgres for Geospatial Data',
    description: (
      <>
        <a href="https://postgis.net/" target="_blank" rel="noopener noreferrer">PostGIS</a> enhances PostgreSQL with advanced geospatial capabilities, enabling you to store, index, and query geographic data seamlessly. Ideal for geospatial analysis and mapping applications.
      </>
    ),
    lightImage: '/img/postgis.png',
    darkImage: '/img/postgis.png',
    reverse: true,
  },
  {
    title: 'Distributed Postgres',
    description: (
      <>
        Transform PostgreSQL into a distributed database with the <a href="https://www.citusdata.com/" target="_blank" rel="noopener noreferrer">Citus</a> extension. Scale from a single cluster to a distributed one, delivering the full power of PostgreSQL at any scale.
      </>
    ),
    lightImage: '/img/citus.png',
    darkImage: '/img/citus.dark2.png',
    reverse: false,
  },
];

export default function Extensibility({ titleFontSize = '1.8rem', descriptionFontSize = '1.2rem' }) {
  const { colorMode } = useColorMode();

  return (
    <section className={styles.extensibilitySection}>
      <h3 className={styles.subTitle}>EXTENSIBILITY</h3>
      <h2 className={styles.sectionTitle}>Everything Database</h2>
      <div className={styles.contentContainer}>
        {blocks.map((block, index) => (
          <div 
            key={index} 
            className={`${styles.extensibilityBlock} ${block.reverse ? styles.reverse : ''} scroll-reveal`}
          >
            <div className={styles.extensibilityImage}>
              <img
                src={colorMode === 'dark' ? block.darkImage : block.lightImage}
                alt={block.title}
              />
            </div>
            <div className={styles.extensibilityContent}>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <p className={styles.description} style={{ fontSize: descriptionFontSize }}>{block.description}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={`scroll-reveal`}>
        PostgreSQL is highly extensible, and our solution enables automatic deployment of clusters with the necessary extensions.
      </p>
    </section>
  );
}
