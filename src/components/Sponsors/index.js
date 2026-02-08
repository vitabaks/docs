import React, { useEffect, useState } from 'react';
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
  {
    name: 'Staffery',
    lightImage: require('@site/static/img/sponsors/staffery.png').default,
    darkImage: require('@site/static/img/sponsors/staffery.png').default,
    link: 'https://www.staffery.com',
  },
  {
    name: 'Antistock',
    lightImage: require('@site/static/img/sponsors/antistock.png').default,
    darkImage: require('@site/static/img/sponsors/antistock.dark.png').default,
    link: 'https://antistock.io',
  },
  {
    name: 'AwareBuildings',
    lightImage: require('@site/static/img/sponsors/awarebuildings.png').default,
    darkImage: require('@site/static/img/sponsors/awarebuildings.dark.png').default,
    link: 'https://www.awarebuildings.com',
  },
  {
    name: 'Codefloe',
    lightImage: require('@site/static/img/sponsors/codefloe.png').default,
    darkImage: require('@site/static/img/sponsors/codefloe.dark.png').default,
    link: 'https://codefloe.com',
  },
  {
    name: 'toncarton',
    lightImage: require('@site/static/img/sponsors/toncarton.png').default,
    darkImage: require('@site/static/img/sponsors/toncarton.dark.png').default,
    link: 'https://www.toncarton.com',
  },
  {
    name: 'Optiwise',
    lightImage: require('@site/static/img/sponsors/optiwise.png').default,
    darkImage: require('@site/static/img/sponsors/optiwise.dark.png').default,
    link: 'https://optiwise.nl',
  },
  {
    name: 'We Manage',
    lightImage: require('@site/static/img/sponsors/we-manage.png').default,
    darkImage: require('@site/static/img/sponsors/we-manage.dark.png').default,
    link: 'https://we-manage.de',
  },
  {
    name: 'Axiom',
    lightImage: require('@site/static/img/sponsors/axiom.png').default,
    darkImage: require('@site/static/img/sponsors/axiom.dark.png').default,
    link: 'https://axiom.trade',
  },
  {
    name: 'Fera.ai',
    lightImage: require('@site/static/img/sponsors/fera.png').default,
    darkImage: require('@site/static/img/sponsors/fera.dark.png').default,
    link: 'https://fera.ai',
  },
  {
    name: 'Newbyte',
    lightImage: require('@site/static/img/sponsors/newbyte.png').default,
    darkImage: require('@site/static/img/sponsors/newbyte.dark.png').default,
    link: 'https://newbyte.net.br',
  },
];

function Sponsor({ name, lightImage, darkImage, link }) {
  const { colorMode } = useColorMode();
  const [currentMode, setCurrentMode] = useState(null);

  useEffect(() => {
    setCurrentMode(colorMode);
  }, [colorMode]);

  if (currentMode === null) {
    return null;
  }

  const image = currentMode === 'dark' ? darkImage : lightImage;

  return (
    <div className={styles.Sponsor} style={{ marginBottom: '30px' }}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt={name}
          className={styles.SponsorImage}
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  );
}

export default function SponsorSection() {
  return (
    <section>
      <h2 className={styles.sectionTitle}>Sponsored by</h2>
      <div className={styles.Sponsors}>
        {Sponsors.map((sponsor, idx) => (
          <Sponsor key={idx} {...sponsor} />
        ))}
      </div>
    </section>
  );
}
