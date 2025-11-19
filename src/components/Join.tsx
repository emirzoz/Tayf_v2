import React, { useState } from 'react';
import type { LangProps, LangKey } from '../types';

const departments = [
  { key: 'mekanik', titleKey: 'teamCard1Title' as LangKey, color: '--c1:#bfdbfe; --c2:#60a5fa; --c3:#1d4ed8;', formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSclVLDlyJaNslauTaTi_y40Z-7teateLN4u0U7B6tnM5Z-ZeQ/viewform', icon: 'icon-mekanik', scale: 0.30, duration: 22 },
  { key: 'elektronik', titleKey: 'teamCard2Title' as LangKey, color: '--c1:#a7f3d0; --c2:#34d399; --c3:#047857;', formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfn6BmYY-4C9Fh-5Ne3KXG68L45tbCRPZ7dcArHtspgVf_20g/viewform', icon: 'icon-elektronik', scale: 0.46, duration: 28 },
  { key: 'ucus', titleKey: 'teamCard3Title' as LangKey, color: '--c1:#e9d5ff; --c2:#a855f7; --c3:#6b21a8;', formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfBIlWWReLruuUEczAag_HHtsQ4x4pb6e0trzZZC6DJ6KgH2w/viewform', icon: 'icon-ucus', scale: 0.62, duration: 34 },
  { key: 'yer', titleKey: 'teamCard4Title' as LangKey, color: '--c1:#fef3c7; --c2:#fbbf24; --c3:#b45309;', formLink: 'https://docs.google.com/forms/d/e/1FAIpQLSfQ8ETfVpVIzsVVHnglyiGMkC17nQqG-azaMKnf3Shv3RRRRQ/viewform', icon: 'icon-yer', scale: 0.78, duration: 40 },
  { key: 'org', titleKey: 'teamCard5Title' as LangKey, color: '--c1:#fce7f3; --c2:#f472b6; --c3:#9d174d;', formLink: 'https://docs.google.com/forms/d/e/1FAIpQLScmo-XJhrZkSSB6i9hvrA-KNzYjsvkd6rnHUMzDbaIeUGScYg/viewform', icon: 'icon-org', scale: 0.94, duration: 46 },
];

// Helper to convert CSS string to a style object
const parseInlineStyles = (styleString: string) => {
    const style: React.CSSProperties = {};
    styleString.split(';').forEach(declaration => {
        const [property, value] = declaration.split(':');
        if (property && value) {
            const propName = property.trim();
            style[propName as any] = value.trim();
        }
    });
    return style;
};


const Join: React.FC<LangProps> = ({ getLangText }) => {
  const [pausedOrbits, setPausedOrbits] = useState<Record<string, boolean>>({});

  const handlePlanetHover = (key: string, isPaused: boolean) => {
    setPausedOrbits(prev => ({ ...prev, [key]: isPaused }));
  };
  
  return (
    <section id="join" className="relative py-16 md:py-20 bg-gradient-to-b from-prussian_blue to-[#042238] text-timberwolf border-t border-[#6E92B6]/30 overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-heading mb-4">{getLangText('joinTitle')}</h2>
        <p className="text-lg opacity-90 max-w-3xl">{getLangText('joinLead')}</p>
        
        <div className="mt-6 hidden md:flex flex-wrap justify-center gap-6 text-sm text-timberwolf/80">
          {departments.map(dept => (
             <div key={dept.key} className="flex items-center gap-2">
                <svg className="w-5 h-5" aria-hidden="true" style={{color: (parseInlineStyles(dept.color) as any)['--c2']}}>
                    <use href={`#${dept.icon}`}></use>
                </svg>
                <span>{getLangText(dept.titleKey)}</span>
            </div>
          ))}
        </div>

        {/* DESKTOP: SOLAR SYSTEM */}
        <div className="solar hidden md:block">
          <div className="absolute inset-0 grid place-items-center" style={{zIndex:2, pointerEvents:'none'}}>
            <div className="w-28 h-28 rounded-full bg-prussian_blue/40 shadow-2xl shadow-[#6E92B6]/30 border border-[#6E92B6]/60 flex items-center justify-center overflow-hidden">
              <img src="./images/LogoWhite.png" alt={getLangText('logoAlt')} className="w-20 h-20 object-contain" />
            </div>
          </div>
          {departments.map(dept => <span key={dept.key} className="orbit-ring" style={{'--orbit-scale': dept.scale} as React.CSSProperties}></span>)}
          {departments.map(dept => (
            <div key={dept.key} className="orbit-lane" style={{ '--orbit-scale': dept.scale, '--dur': `${dept.duration}s` } as React.CSSProperties}>
              <div className={`orbit-wrapper ${pausedOrbits[dept.key] ? 'paused' : ''}`}>
                 <a href={dept.formLink} target="_blank" rel="noopener noreferrer" className="planet" aria-label={getLangText(dept.titleKey)} style={{...parseInlineStyles(dept.color)}} onMouseEnter={() => handlePlanetHover(dept.key, true)} onMouseLeave={() => handlePlanetHover(dept.key, false)}>
                    <svg className="planet-icon" aria-hidden="true">
                        <use href={`#${dept.icon}`}></use>
                    </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* MOBILE CARDS */}
        <div className="grid sm:grid-cols-2 gap-4 mt-10 md:hidden">
          {departments.map(dept => (
            <a key={dept.key} href={dept.formLink} target="_blank" rel="noopener noreferrer" className={`join-card ${dept.key === 'org' ? 'sm:col-span-2' : ''}`}>
              <svg className="icon-join" aria-hidden="true"><use href={`#${dept.icon}`} /></svg>
              <span>{getLangText(dept.titleKey)}</span>
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-10 text-timberwolf/80">
          <div className="px-4 py-3 rounded-xl border border-[#6E92B6]/30 bg-prussian_blue/40">🚀 {getLangText('joinItem1')}</div>
          <div className="px-4 py-3 rounded-xl border border-[#6E92B6]/30 bg-prussian_blue/40">🧪 {getLangText('joinItem2')}</div>
          <div className="px-4 py-3 rounded-xl border border-[#6E92B6]/30 bg-prussian_blue/40">📚 {getLangText('joinItem3')}</div>
          <div className="px-4 py-3 rounded-xl border border-[#6E92B6]/30 bg-prussian_blue/40">🤝 {getLangText('joinItem4')}</div>
        </div>
      </div>
    </section>
  );
};

export default Join;