import React from 'react';
import styles from './styles.module.css';

const links = [
  { label: 'GitHub', href: 'https://github.com/autobase-tech/' },
  { label: 'X', href: 'https://x.com/autobase_tech' },
  { label: 'LinkedIn ', href: 'https://www.linkedin.com/company/autobasetech/' },
  { label: 'YouTube', href: 'https://youtube.com/@autobasetech' },
  { label: 'Telegram', href: 'https://t.me/pavel_kovcheg' },
  { label: 'Email', href: 'mailto:info@autobase.tech' },
  { label: 'Support', href: '/docs/support' },
];

export default function ContactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Contact links">
          {links.map((link, index) => (
            <React.Fragment key={link.label}>
              {index > 0 && <span className={styles.separator}>|</span>}
              <a
                href={link.href}
                className={styles.link}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
