import React, { useState, useEffect, useRef } from 'react';
import type { LangProps, LangKey } from '../types';

const timelineItems = [
    { dateKey: 'timelineItem1Date' as LangKey, descKey: 'timelineItem1Desc' as LangKey },
    { dateKey: 'timelineItem2Date' as LangKey, descKey: 'timelineItem2Desc' as LangKey },
    { dateKey: 'timelineItem3Date' as LangKey, descKey: 'timelineItem3Desc' as LangKey },
    { dateKey: 'timelineItem4Date' as LangKey, descKey: 'timelineItem4Desc' as LangKey },
];

const ProjectTimeline: React.FC<LangProps> = ({ getLangText }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );
        if (timelineRef.current) {
            observer.observe(timelineRef.current);
        }
        return () => {
            if (timelineRef.current) {
                observer.unobserve(timelineRef.current);
            }
        };
    }, []);

    return (
        <div className="mt-16">
            <h3 className="text-2xl font-heading mb-10 text-center text-[#6E92B6]">{getLangText('projectTimelineTitle')}</h3>
            <div ref={timelineRef} className={`timeline-container-h ${isVisible ? 'timeline-visible' : ''}`}>
                <div className="timeline-items-wrapper">
                    {timelineItems.map((item, index) => (
                        <div
                            key={item.dateKey}
                            className="timeline-item-h"
                            style={{ transitionDelay: `${0.8 + index * 0.2}s` }}
                        >
                            <div className="timeline-content-h">
                                <p className="font-bold text-lg text-timberwolf">{getLangText(item.dateKey)}</p>
                                <p className="text-timberwolf/80">{getLangText(item.descKey)}</p>
                            </div>
                            <div className="timeline-dot-h"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Project: React.FC<LangProps> = ({ getLangText }) => {
  const [activeTab, setActiveTab] = useState<'gallery' | '3d'>('gallery');
  const [is3dModelLoaded, setIs3dModelLoaded] = useState(false);
  const drScoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const countUp = (target: number, duration = 1000) => {
        const el = drScoreRef.current;
        if (!el) return;

        let start: number | null = null;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = progress * target;
            el.textContent = value.toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = target.toString();
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                countUp(96.5);
                observer.unobserve(entry.target);
            }
        },
        { threshold: 0.5 }
    );
    if (drScoreRef.current) {
        observer.observe(drScoreRef.current);
    }
    return () => {
        if (drScoreRef.current) {
            observer.unobserve(drScoreRef.current);
        }
    };
  }, []);

  const handleTabClick = (tab: 'gallery' | '3d') => {
    setActiveTab(tab);
    if (tab === '3d' && !is3dModelLoaded) {
      setIs3dModelLoaded(true);
    }
  };

  const TabButton: React.FC<{ tabId: 'gallery' | '3d', labelKey: 'tabGallery' | 'tab3D'}> = ({ tabId, labelKey}) => {
    const isActive = activeTab === tabId;
    return (
        <button 
            id={`tab-${tabId}`} 
            role="tab" 
            aria-selected={isActive} 
            aria-controls={`panel-${tabId}`}
            onClick={() => handleTabClick(tabId)}
            className={`px-3 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#6E92B6] ${isActive ? 'bg-[#6E92B6]/20 text-timberwolf border-[#6E92B6]/40' : 'text-timberwolf/80 hover:text-timberwolf border-transparent hover:border-[#6E92B6]/40'}`}
        >
            {getLangText(labelKey)}
        </button>
    );
  };

  return (
    <section id="project" className="py-16 md:py-20 bg-gradient-to-b from-prussian_blue to-[#042238]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-heading mb-6">{getLangText('projectTitle')}</h2>
            <p className="text-lg leading-relaxed opacity-90">{getLangText('projectText')}</p>
            <div className="mt-8 pt-8 border-t border-[#6E92B6]/30 space-y-6">
              <section aria-labelledby="achievements-title">
                <h3 id="achievements-title" className="text-2xl font-heading mb-3 text-[#6E92B6]">{getLangText('projectAchievementsTitle')}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{getLangText('ach1')}</li>
                  <li>{getLangText('ach2')}</li>
                  <li>{getLangText('ach3')}</li>
                </ul>
              </section>
              <section aria-labelledby="goals-title">
                <h3 id="goals-title" className="text-2xl font-heading mb-3 text-[#6E92B6]">{getLangText('projectGoalsTitle')}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{getLangText('goal1')}</li>
                  <li>{getLangText('goal2')}</li>
                  <li>{getLangText('goal3')}</li>
                </ul>
              </section>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="px-3 py-1 rounded-lg bg-prussian_blue/40 border border-[#6E92B6]/40">{getLangText('badgeFounded')}</span>
                <span className="px-3 py-1 rounded-lg bg-prussian_blue/40 border border-[#6E92B6]/40">
                  {getLangText('badgeDRScorePrefix')}
                  <span ref={drScoreRef}>0</span>/100
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-heading mb-4">{getLangText('galleryTitle')}</h3>
            <div className="flex gap-2 mb-4" role="tablist" aria-label="Project media">
                <TabButton tabId="gallery" labelKey="tabGallery" />
                <TabButton tabId="3d" labelKey="tab3D" />
            </div>

            <div id="panel-gallery" role="tabpanel" aria-labelledby="tab-gallery" className={activeTab === 'gallery' ? '' : 'hidden'}>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/1.jpg" alt={getLangText('projectImageAlt1')} className="w-full h-48 object-contain rounded-lg shadow-lg bg-yinmn_blue" />
                <img src="/images/5.jpeg" alt={getLangText('projectImageAlt2')} className="w-full h-48 object-contain rounded-lg shadow-lg bg-yinmn_blue" />
                <img src="/images/7.jpg" alt={getLangText('projectImageAlt3')} className="w-full h-48 object-contain rounded-lg shadow-lg bg-yinmn_blue" />
                <img src="/images/8.jpeg" alt={getLangText('projectImageAlt4')} className="w-full h-48 object-contain rounded-lg shadow-lg bg-yinmn_blue" />
              </div>
              <img src="/images/6.png" alt={getLangText('projectImageAlt5')} className="w-full h-64 object-contain rounded-lg shadow-lg bg-yinmn_blue mt-4" />
            </div>

            <div id="panel-3d" role="tabpanel" aria-labelledby="tab-3d" className={activeTab === '3d' ? '' : 'hidden'}>
              <div className="rounded-xl overflow-hidden border border-[#6E92B6]/40 bg-white/5 ratio-video">
                {is3dModelLoaded && (
                  <iframe
                    title="Communication Satellite (Sketchfab)"
                    className="absolute inset-0 w-full h-full"
                    src="https://sketchfab.com/models/9a7ad3344edb4e598de848a5badb7416/embed?ui_theme=dark"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    allowFullScreen
                    >
                  </iframe>
                )}
              </div>
               <p className="mt-3 text-timberwolf/70 text-sm">{getLangText('hintPan')}</p>
            </div>
          </div>
        </div>
        <ProjectTimeline getLangText={getLangText} />
      </div>
    </section>
  );
};

export default Project;