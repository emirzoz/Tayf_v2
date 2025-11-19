import React from 'react';
import type { LangProps, LangKey } from '../types';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-blue_gray mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

interface TierCardProps extends LangProps {
    titleKey: LangKey;
    benefits: LangKey[];
    isFeatured?: boolean;
    badgeKey?: LangKey;
}

const TierCard: React.FC<TierCardProps> = ({ getLangText, titleKey, benefits, isFeatured = false, badgeKey }) => {
    const cardBaseClasses = "relative bg-yinmn_blue/30 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-2 h-full flex flex-col";
    const featuredClasses = "border-2 border-blue_gray shadow-2xl shadow-blue_gray/20";
    const nonFeaturedClasses = "border border-blue_gray/30";

    return (
        <div className={`relative ${isFeatured ? 'z-10' : ''}`}>
            {isFeatured && badgeKey && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue_gray text-prussian_blue px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider z-10">
                    {getLangText(badgeKey)}
                </div>
            )}
            <div className={`${cardBaseClasses} ${isFeatured ? featuredClasses : nonFeaturedClasses}`}>
                <h3 className="text-2xl font-heading mb-4 text-center">{getLangText(titleKey)}</h3>
                <ul className="space-y-3 text-timberwolf/90 flex-grow">
                    {benefits.map(benefitKey => (
                        <li key={benefitKey} className="flex items-start">
                            <CheckIcon />
                            <span>{getLangText(benefitKey)}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 text-center">
                   <a href="#contact" className="inline-block bg-blue_gray/80 text-prussian_blue px-6 py-2 rounded-lg font-bold transition shadow-lg hover:bg-blue_gray focus:outline-none focus:ring-2 focus:ring-[#6E92B6]">
                        {getLangText('contactTitle')}
                    </a>
                </div>
            </div>
        </div>
    )
};

const Sponsor: React.FC<LangProps> = ({ getLangText }) => {

  return (
    <section id="sponsor" className="py-16 md:py-20 bg-gradient-to-b from-[#042238] to-prussian_blue overflow-hidden">
      <div className="container mx-auto px-6 space-y-16">

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-heading mb-4">{getLangText('sponsorIntroTitle')}</h2>
          <p className="text-xl opacity-90 mb-8">{getLangText('sponsorIntroSubtitle')}</p>
          <a href="./ITU_Tayf_Tanitim_Dosyasi.pdf" download className="inline-block bg-blue_gray text-prussian_blue px-10 py-4 rounded-lg font-bold transition shadow-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#6E92B6] hover:ring-2 hover:ring-[#6E92B6]">
            {getLangText('sponsorIntroBtn')}
          </a>
        </div>
        
        {/* Tiers */}
        <div className="text-center">
            <h2 className="text-3xl font-heading mb-10">{getLangText('sponsorTiersTitle')}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <TierCard 
                    getLangText={getLangText}
                    titleKey="sponsorTierSilverTitle"
                    benefits={['sponsorTierSilverBenefit1', 'sponsorTierSilverBenefit2']}
                />
                <TierCard 
                    getLangText={getLangText}
                    titleKey="sponsorTierPlatinumTitle"
                    badgeKey="sponsorTierPlatinumBadge"
                    benefits={['sponsorTierPlatinumBenefit1', 'sponsorTierPlatinumBenefit2', 'sponsorTierPlatinumBenefit3', 'sponsorTierPlatinumBenefit4']}
                    isFeatured
                />
                <TierCard 
                    getLangText={getLangText}
                    titleKey="sponsorTierGoldTitle"
                    benefits={['sponsorTierGoldBenefit1', 'sponsorTierGoldBenefit2', 'sponsorTierGoldBenefit3']}
                />
            </div>
        </div>

        {/* Final CTA */}
        <div className="bg-yinmn_blue/30 border border-[#6E92B6]/60 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 items-center text-center md:text-left">
            <div className="md:col-span-2">
                <h3 className="text-2xl font-heading mb-2">{getLangText('sponsorFinalCtaTitle')}</h3>
                <p className="text-timberwolf/90">{getLangText('sponsorFinalCtaText')}</p>
            </div>
            <div className="flex gap-6 justify-center md:justify-end">
                 <a href="mailto:tayf.takimi@itu.edu.tr" aria-label={getLangText('contactEmailAriaLabel')} className="text-blue_gray hover:text-timberwolf transition">
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                 </a>
                 <a href="https://www.linkedin.com/company/i%CC%87t%C3%BC-tayf/" target="_blank" rel="noopener noreferrer" aria-label={getLangText('contactLinkedInAriaLabel')} className="text-blue_gray hover:text-timberwolf transition">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 </a>
                 <a href="https://instagram.com/itu.tayf" target="_blank" rel="noopener noreferrer" aria-label={getLangText('contactInstagramAriaLabel')} className="text-blue_gray hover:text-timberwolf transition">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                 </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsor;