import React from 'react';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Postgres for AI',
    description: 'Leverage pgvector and pgvectorscale to build and deploy Retrieval Augmented Generation (RAG) applications directly within PostgreSQL. Achieve high-performance embedding search and cost-efficient storage, making PostgreSQL the ideal platform for your AI applications.',
    image: '/img/pgvector.png',
    reverse: false,
  },
  {
    title: 'Postgres for Search and Analytics',
    description: 'ParadeDB, a modern alternative to Elasticsearch, is built on PostgreSQL to handle real-time, update-heavy workloads. Optimize your search and analytics processes with PostgreSQL’s reliability and flexibility.',
    image: '/img/paradedb.png',
    reverse: true,
  },
  {
    title: 'Postgres for Time-Series Data',
    description: 'Harness the power of TimescaleDB, a leading time-series extension for PostgreSQL. Store, query, and analyze time-series data efficiently, all within your PostgreSQL database.',
    image: '/img/timescaledb.png',
    reverse: false,
  },
  {
    title: 'Postgres for Geospatial Data',
    description: 'PostGIS enhances PostgreSQL with advanced geospatial capabilities, enabling you to store, index, and query geographic data seamlessly. Ideal for geospatial analysis and mapping applications.',
    image: '/img/postgis.png',
    reverse: true,
  },
  {
    title: 'Distributed Postgres',
    description: 'Transform PostgreSQL into a distributed database with the Citus extension. Scale from a single cluster to a distributed one, delivering the full power of PostgreSQL at any scale.',
    image: '/img/citus.png',
    reverse: false,
  },
];

export default function Extensibility({ titleFontSize = '1.8rem', descriptionFontSize = '1.2rem' }) {
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
              <img src={block.image} alt={block.title} />
            </div>
            <div className={styles.extensibilityContent}>
              <h3 className={styles.blockTitle}>{block.title}</h3>
              <p className={styles.description}>{block.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
