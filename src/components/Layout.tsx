import { type PropsWithChildren, useEffect, useId, useState } from 'react';
import { site } from '../data/site';
import { Link, NavLink, useLocation } from '../router';

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Rev Silicon home" onClick={() => setOpen(false)}>
          <span className="brand-mark-wrap">
            <img src="/assets/logo-plate.png" alt="" className="brand-mark" />
          </span>
          <span className="brand-name">REV SILICON</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <nav id={menuId} className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <Link className="nav-cta" to="/join" onClick={() => setOpen(false)}>Join the team <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-logo-tile"><img src="/assets/logo-plate.png" alt="" /></span>
          <div>
            <p className="footer-wordmark">REV SILICON</p>
            <p>{site.shortDescription}</p>
          </div>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <p className="micro-label">Navigate</p>
          {site.nav.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
        </nav>
        <div className="footer-contact">
          <p className="micro-label">Texas A&amp;M University</p>
          <p>College Station, Texas</p>
          <p>Student-led. Faculty-advised.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 REV SILICON</p>
        <p>FROM ARCHITECTURE TO TAPEOUT</p>
      </div>
    </footer>
  );
}

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
