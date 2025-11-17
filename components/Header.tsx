import React, { useState, useEffect } from 'react';
import type { Language, LangKey } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  getLangText: (key: LangKey) => string;
}

const navLinks = [
  { href: '#project', key: 'navProject' as LangKey },
  { href: '#team', key: 'navTeam' as LangKey },
  { href: '#sponsor', key: 'navSponsor' as LangKey },
  { href: '#join', key: 'navJoin' as LangKey },
  { href: '#contact', key: 'navContact' as LangKey },
];

const Header: React.FC<HeaderProps> = ({ lang, setLang, getLangText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');

  useEffect(() => {
    const handleHashChange = () => {
      setActiveLink(window.location.hash || '#hero');
    };
    handleHashChange(); // Initial check
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const LangButton: React.FC<{ targetLang: Language }> = ({ targetLang }) => {
    const isActive = lang === targetLang;
    const baseClass = 'font-semibold px-2 py-1 rounded-md hover:bg-[#6E92B6]/20 focus:outline-none focus:ring-2 focus:ring-[#6E92B6]';
    const activeClass = 'text-timberwolf';
    const inactiveClass = 'text-timberwolf/70';

    return (
      <button
        onClick={() => setLang(targetLang)}
        className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
      >
        {targetLang.toUpperCase()}
      </button>
    );
  };

  const NavLink: React.FC<{ href: string, textKey: LangKey, isMobile?: boolean }> = ({ href, textKey, isMobile }) => {
    const isActive = activeLink === href;
    const commonClasses = 'transition focus:outline-none focus:ring-2 focus:ring-[#6E92B6] rounded-sm';
    const desktopClasses = `text-timberwolf hover:text-[#6E92B6] underline-offset-8 decoration-transparent hover:decoration-[#6E92B6] ${isActive ? 'underline decoration-[#6E92B6]' : ''}`;
    const mobileClasses = 'block text-timberwolf hover:text-[#6E92B6]';
    
    return (
        <a href={href} className={`${commonClasses} ${isMobile ? mobileClasses : desktopClasses}`} onClick={isMobile ? closeMenu : undefined} aria-current={isActive ? 'page' : undefined}>
            {getLangText(textKey)}
        </a>
    )
  }

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden z-[55] ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile slide-in menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 max-w-[80vw] bg-prussian_blue border-l border-[#6E92B6]/60 transform transition-transform duration-300 ease-out md:hidden z-[60] flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-20 flex items-center px-6 border-b border-[#6E92B6]/40">
          <span className="text-xl font-heading font-bold">İTÜ TAYF</span>
        </div>
        <nav className="px-6 pt-6 space-y-4">
            {navLinks.map(link => <NavLink key={link.key} href={link.href} textKey={link.key} isMobile />)}
        </nav>
        <div className="mt-auto px-6 py-4 border-t border-[#6E92B6]/40 flex items-center gap-2">
          <LangButton targetLang="tr" />
          <span className="text-yinmn_blue">|</span>
          <LangButton targetLang="en" />
        </div>
      </div>

      <nav className="relative bg-[#6E92B6]/15 backdrop-blur border-b-2 border-[#6E92B6]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6E92B6] to-transparent opacity-60"></div>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="text-2xl font-heading font-bold text-timberwolf focus:outline-none focus:ring-2 focus:ring-[#6E92B6] rounded-sm">
            İTÜ TAYF
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <NavLink key={link.key} href={link.href} textKey={link.key} />)}
            <div className="flex gap-2 ml-4 border-l border-yinmn_blue pl-4">
              <LangButton targetLang="tr" />
              <span className="text-yinmn_blue">|</span>
              <LangButton targetLang="en" />
            </div>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-auto inline-flex items-center justify-center p-2 rounded-md text-timberwolf hover:bg-[#6E92B6]/20 focus:outline-none focus:ring-2 focus:ring-[#6E92B6]"
            aria-label={getLangText('menuAriaLabel')}
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;