import React from 'react';

const CloudProviders = [
  {
    name: 'AWS',
    image: '/img/aws.svg',
  },
  {
    name: 'Google Cloud',
    image: '/img/gcp.svg',
  },
  {
    name: 'Azure',
    image: '/img/azure.svg',
  },
  {
    name: 'Digital Ocean',
    image: '/img/digitalocean.svg',
  },
  {
    name: 'Hetzner Cloud',
    image: '/img/hetzner.svg',
  },
];

function CloudProvider({ name, image }) {
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <img src={image} alt={name} style={{ maxWidth: '150px', marginBottom: '20px' }} />
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
