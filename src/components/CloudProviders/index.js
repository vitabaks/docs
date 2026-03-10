import React from 'react';
import styles from './styles.module.css';

const CloudProviders = [
  {
    name: 'AWS',
    image: '/img/aws.svg',
    link: '/docs/deployment/aws'
  },
  {
    name: 'Google Cloud',
    image: '/img/gcp.svg',
    link: '/docs/deployment/gcp'
  },
  {
    name: 'Azure',
    image: '/img/azure.svg',
    link: '/docs/deployment/azure'
  },
  {
    name: 'Digital Ocean',
    image: '/img/digitalocean.svg',
    link: '/docs/deployment/digitalocean'
  },
  {
    name: 'Hetzner Cloud',
    image: '/img/hetzner.svg',
    link: '/docs/deployment/hetzner'
  },
  {
    name: 'Your Own Machines',
    image: '/img/your-own-machines.svg',
    link: '/docs/deployment/your-own-machines'
  },
];

function CloudProvider({ name, image, link }) {
  return (
    <div className={styles.cloudProvider}>
      <a href={link}>
        <img src={image} alt={name} className={styles.cloudImage} />
      </a>
    </div>
  );
}

export default function CloudProviderSection() {
  return (
    <section>
      <h2 className={styles.heading}>
        Deploy <span className={styles.managedPostgres}>your own managed Postgres</span> on bare metal and in the cloud
      </h2>
      <div className={styles.cloudProvidersList}>
        {CloudProviders.map((provider, idx) => (
          <CloudProvider key={idx} {...provider} />
        ))}
      </div>
    </section>
  );
}
