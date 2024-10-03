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
        Powerful alternative to cloud-managed databases like RDS, Cloud SQL, and Heroku with a fully automated, self-managed database.
        Optimize performance, save costs, and gain complete control over your infrastructure and data.
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

function Feature({ title, description, borderColor }) {
  return (
    <div className={clsx('col col--4', styles.featureItem)}>
      <div className={styles.featureContent} style={{ '--border-color': borderColor }}>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container" >
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
