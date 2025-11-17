import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Project from './components/Project';
import Team from './components/Team';
import Sponsor from './components/Sponsor';
import Launches from './components/Launches';
import Join from './components/Join';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { langData } from './constants';
import type { Language } from './types';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('tr');

  const getLangText = <T extends keyof (typeof langData)['tr']>(key: T): string => {
    return langData[lang][key] || langData['tr'][key];
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} getLangText={getLangText} />
      <main>
        <Hero getLangText={getLangText} />
        <Metrics getLangText={getLangText} />
        <Project getLangText={getLangText} />
        <Team getLangText={getLangText} />
        <Sponsor getLangText={getLangText} />
        <Launches lang={lang} getLangText={getLangText} />
        <Join getLangText={getLangText} />
        <Contact getLangText={getLangText} />
      </main>
      <Footer getLangText={getLangText} />
    </>
  );
};

export default App;