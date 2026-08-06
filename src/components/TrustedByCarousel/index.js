import React from 'react';
import styles from './styles.module.css';

const trusted = [
  { name: 'Axiom', img: '/img/trusted/axiom.png', darkImg: '/img/trusted/axiom.dark.png', href: 'https://axiom.trade' },
  { name: 'Awarebuildings', img: '/img/trusted/awarebuildings.png', darkImg: '/img/trusted/awarebuildings.dark.png', href: 'https://www.awarebuildings.com' },
  { name: 'Antistock', img: '/img/trusted/antistock.png', darkImg: '/img/trusted/antistock.dark.png', href: 'https://antistock.io' },
  { name: 'Codefloe', img: '/img/trusted/codefloe.png', darkImg: '/img/trusted/codefloe.dark.png', href: 'https://codefloe.com' },
  { name: 'Edclub', img: '/img/trusted/edclub.png', darkImg: '/img/trusted/edclub.dark.png', href: 'https://www.edclub.com' },
  { name: 'Fera', img: '/img/trusted/fera.png', darkImg: '/img/trusted/fera.dark.png', href: 'https://fera.ai' },
  { name: 'GS Labs', img: '/img/trusted/gs-labs.png', darkImg: '/img/trusted/gs-labs.dark.png', href: 'https://gs-labs.ru' },
  { name: 'New Byte', img: '/img/trusted/newbyte.png', darkImg: '/img/trusted/newbyte.dark.png', href: 'https://newbyte.net.br' },
  { name: 'Optiwise', img: '/img/trusted/optiwise.png', darkImg: '/img/trusted/optiwise.dark.png', href: 'https://optiwise.nl' },
  { name: 'Postgres.AI', img: '/img/trusted/postgresai.png', darkImg: '/img/trusted/postgresai.dark.png', href: 'https://postgres.ai' },
  { name: 'Staffery', img: '/img/trusted/staffery.png', href: 'https://www.staffery.com' },
  { name: 'Toncarton', img: '/img/trusted/toncarton.png', darkImg: '/img/trusted/toncarton.dark.png', href: 'https://www.toncarton.com' },
  { name: 'We-Manage', img: '/img/trusted/we-manage.png', darkImg: '/img/trusted/we-manage.dark.png', href: 'https://we-manage.de' },
  { name: 'Asakabank', img: '/img/trusted/asakabank.png', darkImg: '/img/trusted/asakabank.dark.png', href: 'https://www.asakabank.uz/en/' },
];

function normalizeLogoSize(event) {
  const image = event.currentTarget;
  if (!image.naturalWidth || !image.naturalHeight) {
    return;
  }

  if (image.naturalHeight / image.naturalWidth > 0.55) {
    image.classList.add(styles.logoSquareAsset);
  }
}

function LogoSet({ hidden = false }) {
  return (
    <div className={styles.logoSet} aria-hidden={hidden}>
      {trusted.map((sponsor) => {
        const content = (
          <>
            <img
              src={sponsor.img}
              alt={hidden ? '' : sponsor.name}
              className={`${styles.logoImg} ${sponsor.darkImg ? styles.logoLight : ''}`}
              onLoad={normalizeLogoSize}
              loading="lazy"
              decoding="async"
            />
            {sponsor.darkImg && (
              <img
                src={sponsor.darkImg}
                alt=""
                aria-hidden="true"
                className={`${styles.logoImg} ${styles.logoDark}`}
                onLoad={normalizeLogoSize}
                loading="lazy"
                decoding="async"
              />
            )}
          </>
        );

        return hidden ? (
          <span key={sponsor.name} className={styles.logoLink}>
            {content}
          </span>
        ) : (
          <a
            key={sponsor.name}
            href={sponsor.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.logoLink}
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}

export default function TrustedByCarousel() {
  return (
    <div className={styles.trustedBy}>
      <div className={styles.label}>
        <span className={styles.prompt}>//</span>
        <span>Trusted by teams running Autobase in production</span>
      </div>
      <div className={styles.strip}>
        <div className={styles.track}>
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </div>
  );
}
