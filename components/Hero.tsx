import React from 'react';
import type { LangProps } from '../types';

const Hero: React.FC<LangProps> = ({ getLangText }) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-timberwolf pt-20"
      style={{
        background: `radial-gradient(ellipse at center, rgba(59, 91, 130, 0.6) 0%, rgba(6, 43, 70, 0.9) 100%), url('/images/iss033e009282~orig-min.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}>
      <div className="container mx-auto px-6 text-center py-8">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
          <img src="/images/LogoWhite.png" alt={getLangText('logoAlt')} width="256" height="256" className="mx-auto mb-4 h-20 sm:h-24 md:h-28 lg:h-32 w-auto animate-logo-pop" loading="eager" decoding="async" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mt-2 mb-4 md:mb-6 leading-tight drop-shadow animate-title-slide">
            {getLangText('heroTitle')}
          </h1>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 animate-subtitle-slide">
          {getLangText('heroSubtitle')}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#project" className="bg-blue_gray text-prussian_blue px-8 py-4 rounded-lg font-bold hover:opacity-90 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6E92B6] hover:ring-2 hover:ring-[#6E92B6] animate-cta-fade" style={{ animationDelay: '.26s' }}>
            {getLangText('heroBtnProject')}
          </a>
          <a href="#sponsor" className="bg-transparent border-2 border-blue_gray text-timberwolf px-8 py-4 rounded-lg font-bold transition hover:bg-blue_gray hover:text-prussian_blue focus:outline-none focus:ring-2 focus:ring-[#6E92B6] hover:ring-2 hover:ring-[#6E92B6] animate-cta-fade" style={{ animationDelay: '.34s' }}>
            {getLangText('heroBtnSponsor')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;