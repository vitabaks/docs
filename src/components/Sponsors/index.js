import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

const Sponsors = [
  {
    name: 'edclub',
    lightImage: require('@site/static/img/sponsors/edclub.png').default,
    darkImage: require('@site/static/img/sponsors/edclub.dark.png').default,
    link: 'https://www.edclub.com',
  },
  {
    name: 'gs-labs',
    lightImage: require('@site/static/img/sponsors/gs-labs.png').default,
    darkImage: require('@site/static/img/sponsors/gs-labs.dark.png').default,
    link: 'https://gs-labs.ru',
  },
  {
    name: 'Postgres.AI',
    lightImage: require('@site/static/img/sponsors/postgresai.png').default,
    darkImage: require('@site/static/img/sponsors/postgresai.dark.png').default,
    link: 'https://postgres.ai',
  },
];

function Sponsor({ name, lightImage, darkImage, link }) {
  const { colorMode } = useColorMode();

  // Determine the image depending on the current theme
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
      <h2 style={{ textAlign: 'center', marginTop: '60px' }}>Sponsored by</h2>
      <div className={styles.Sponsors}>
        {Sponsors.map((sponsor, idx) => (
          <Sponsor key={idx} {...sponsor} />
        ))}
      </div>
    </section>
  );
}
