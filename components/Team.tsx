
import React from 'react';
import type { LangProps, LangKey } from '../types';

interface TeamCardProps extends LangProps {
  iconId: string;
  titleKey: LangKey;
  textKey: LangKey;
}

const TeamCard: React.FC<TeamCardProps> = ({ getLangText, iconId, titleKey, textKey }) => {
  return (
    <div className="bg-prussian_blue p-6 rounded-lg shadow-lg hover:shadow-xl transition border border-blue_gray">
      <div className="w-12 h-12 bg-blue_gray rounded-lg mb-4 flex items-center justify-center">
        <svg className="w-6 h-6 text-prussian_blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <use href={`#${iconId}`}></use>
        </svg>
      </div>
      <h3 className="text-xl font-heading mb-3">{getLangText(titleKey)}</h3>
      <p className="opacity-90">{getLangText(textKey)}</p>
    </div>
  );
};

const Team: React.FC<LangProps> = ({ getLangText }) => {
  const teams = [
    { icon: 'icon-mekanik', title: 'teamCard1Title' as LangKey, text: 'teamCard1Text' as LangKey },
    { icon: 'icon-elektronik', title: 'teamCard2Title' as LangKey, text: 'teamCard2Text' as LangKey },
    { icon: 'icon-ucus', title: 'teamCard3Title' as LangKey, text: 'teamCard3Text' as LangKey },
    { icon: 'icon-yer', title: 'teamCard4Title' as LangKey, text: 'teamCard4Text' as LangKey },
    { icon: 'icon-org', title: 'teamCard5Title' as LangKey, text: 'teamCard5Text' as LangKey },
  ];
  return (
    <section id="team" className="py-16 md:py-20 bg-gradient-to-tl from-yinmn_blue to-prussian_blue">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-heading text-center mb-16">{getLangText('teamTitle')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teams.map(team => (
            <TeamCard
              key={team.title}
              getLangText={getLangText}
              iconId={team.icon}
              titleKey={team.title}
              textKey={team.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;