import React from 'react';

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
];

function CloudProvider({ name, image, link }) {
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <a href={link}>
        <img src={image} alt={name} style={{ maxWidth: '150px', marginBottom: '20px' }} />
      </a>
    </div>
  );
}

export default function CloudProviderSection() {
  return (
    <section>
      <h2 style={{ textAlign: 'center', marginTop: '25px', marginBottom: '20px' }}>Available on multiple cloud providers</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', maxWidth: '65%', margin: '0 auto' }}>
        {CloudProviders.map((provider, idx) => (
          <CloudProvider key={idx} {...provider} />
        ))}
      </div>
    </section>
  );
}
