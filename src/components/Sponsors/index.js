import React from 'react';
import styles from './styles.module.css';

const Sponsors = [
  {
    name: 'edclub',
    image: '/img/sponsors/edclub.png',
    link: 'https://www.edclub.com'
  },
  {
    name: 'gs-labs',
    image: '/img/sponsors/gs-labs.png',
    link: 'https://gs-labs.ru'
  },
];

function Sponsor({ name, image, link }) {
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
