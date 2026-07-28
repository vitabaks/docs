import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import OriginalNavbar from '@theme-original/Navbar';
import styles from './styles.module.css';

const navLinks = [
  { label: '/pricing', to: '/pricing' },
  { label: '/docs',   to: '/docs' },
  { label: 'Get Started ↵', to: '/docs/#getting-started', isCta: true },
];

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function Navbar(props) {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const homePath = useBaseUrl('/');
  const pricingPath = useBaseUrl('/pricing');
  const normalizedPath = normalizePath(pathname);
  const isLandingHeader =
    normalizedPath === normalizePath(homePath) ||
    normalizedPath === normalizePath(pricingPath);

  if (!isLandingHeader) {
    return (
      <div className={styles.docsNavbar}>
        <OriginalNavbar {...props} />
      </div>
    );
  }

  return (
    <nav className={`navbar ${styles.navbar}`}>
      <div className={styles.inner}>

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="autobase home">
          <img
            src="/img/navbar/logo-icon.svg"
            alt=""
            className={styles.logoIcon}
            width={40}
            height={35}
          />
          <span className={styles.logoText}>Autobase</span>
        </Link>

        {/* Center nav links */}
        <nav className={styles.navLinks} aria-label="Main navigation">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={link.isCta ? `${styles.cta} ${styles.ctaPrimary}` : styles.navLink}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className={styles.mobileMenu}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <span>{isMenuOpen ? 'close' : 'menu'}</span>
          </button>

          {isMenuOpen && (
            <nav className={styles.mobileNav} aria-label="Mobile navigation">
              {navLinks.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`${styles.mobileNavLink} ${link.isCta ? styles.mobileNavCta : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileNavLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
          )}
        </div>

      </div>
    </nav>
  );
}
