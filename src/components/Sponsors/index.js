import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const Sponsors = [
  {
    name: 'edclub',
    lightImage: '/img/sponsors/edclub.png',
    darkImage: '/img/sponsors/edclub.dark.png',
    link: 'https://www.edclub.com'
  },
  {
    name: 'gs-labs',
    lightImage: '/img/sponsors/gs-labs.png',
    darkImage: '/img/sponsors/gs-labs.png',
    link: 'https://gs-labs.ru'
  },
  {
    name: 'Postgres.AI',
    lightImage: '/img/sponsors/postgresai.png',
    darkImage: '/img/sponsors/postgresai.dark.png',
    link: 'https://postgres.ai'
  },
];

function Sponsor({ name, lightImage, darkImage, link }) {
  const { colorMode } = useColorMode();
  const image = colorMode === 'dark' ? darkImage : lightImage;

  return (
    <div className={styles.Sponsor} style={{ marginBottom: '30px' }}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={name} className={styles.SponsorImage} />
      </a>
    </div>
  );
}

export default function SponsorSection() {
  return (
    <section>
      <h3 style={{ textAlign: 'center', marginTop: '40px' }}>Sponsored by</h3>
      <div className={styles.Sponsors}>
        {Sponsors.map((sponsor, idx) => (
          <Sponsor key={idx} {...sponsor} />
        ))}
      </div>
    </section>
  );
}
