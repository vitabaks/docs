import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const blocks = [
  {
    title: 'Postgres for AI',
    description: (
      <>
        Leverage <a href="https://github.com/pgvector/pgvector" target="_blank" rel="noopener noreferrer">pgvector</a>, 
        <a href="https://github.com/timescale/pgvectorscale" target="_blank" rel="noopener noreferrer"> pgvectorscale</a> and <a href="https://github.com/timescale/pgai" target="_blank" rel="noopener noreferrer"> pgai </a>
        to build and deploy Retrieval Augmented Generation (RAG) applications directly within PostgreSQL. Achieve high-performance embedding search and cost-efficient storage, making PostgreSQL the ideal platform for your AI applications.
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
        Transform PostgreSQL into a high-performance search and analytics engine using ParadeDB’s <a href="https://github.com/paradedb/paradedb/tree/dev/pg_search" target="_blank" rel="noopener noreferrer">pg_search</a>, <a href="https://github.com/paradedb/pg_analytics" target="_blank" rel="noopener noreferrer">pg_analytics</a>, or <a href="https://github.com/duckdb/pg_duckdb" target="_blank" rel="noopener noreferrer">pg_duckdb</a>. 
        Boost search capabilities with BM25 scoring, custom tokenizers, and hybrid search. Seamlessly query and ingest data directly from S3, GCS, Azure Blob Storage, and more.
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
        Harness the power of <a href="https://www.timescale.com/" target="_blank" rel="noopener noreferrer">TimescaleDB</a>, a leading time-series extension for PostgreSQL, to achieve up to 1000x faster queries, 90% data compression, and efficient storage.
        Store and query data quickly and efficiently with automatic partitioning, columnar compression, and real-time aggregation.
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
       Enhance PostgreSQL with <a href="https://postgis.net/" target="_blank" rel="noopener noreferrer">PostGIS</a> to unlock advanced geospatial capabilities. Seamlessly store, index, and query geographic data, making it ideal for geospatial analysis and mapping applications.
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
        Transform PostgreSQL into a distributed database with <a href="https://www.citusdata.com/" target="_blank" rel="noopener noreferrer">Citus</a>.
        Effortlessly scale from a single cluster to a distributed one, making it the ideal solution when a single cluster is no longer sufficient. Achieve seamless sharding and handle larger workloads while retaining the full power of PostgreSQL at any scale.
      </>
    ),
    lightImage: '/img/citus.png',
    darkImage: '/img/citus.dark.png',
    reverse: false,
  },
  {
    title: 'Extensible Postgres',
    description: (
      <>
        PostgreSQL is highly extensible.
        With our automated database platform, you can easily install any of the 300+ available <a href="/docs/extensions/list" target="_blank" rel="noopener noreferrer">extensions </a>
        to equip your database with powerful capabilities tailored to your project’s unique requirements.
      </>
    ),
    lightImage: '/img/extension.png',
    darkImage: '/img/extension.png',
    reverse: true,
  },
];

export default function Extensibility() {
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
              <p className={styles.description}>{block.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
