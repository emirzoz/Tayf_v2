import React from 'react';
import type { LangProps } from '../types';

const Footer: React.FC<LangProps> = ({ getLangText }) => {
  return (
    <footer className="bg-yinmn_blue text-timberwolf py-6 border-t border-yinmn_blue">
      <div className="container mx-auto px-6 text-center opacity-75">
        <p>{getLangText('footerCopyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;