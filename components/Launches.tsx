import React, { useState, useEffect } from 'react';
import type { FullLangProps, Launch, ApodData, LangKey } from '../types';

const LAUNCH_API_URL = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=10&related=false';
const APOD_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=EJbHG3NHr8CJWHTCAieoCjd2P2aqBXRG8GTRHbsR&thumbs=true';

const MAX_COUNT = 9;

const formatDateIstanbul = (iso: string, lang: 'tr' | 'en') => {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    const locale = lang === 'en' ? 'en-GB' : 'tr-TR';
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Europe/Istanbul',
    }).format(d);
  } catch {
    return iso;
  }
};

const LaunchCard: React.FC<{ launch: Launch, lang: 'tr' | 'en', getLangText: (key: LangKey) => string }> = ({ launch, lang, getLangText }) => {
  const name = launch.name || getLangText('launchesUnknownName');
  const provider = launch.launch_service_provider?.name || getLangText('launchesUnknownOperator');
  const location = launch.pad?.name || launch.pad?.location?.name || getLangText('launchesUnknownLocation');
  const windowStart = launch.window_start || launch.net || launch.last_updated;
  const timeStr = windowStart ? formatDateIstanbul(windowStart, lang) : getLangText('launchesNoDate');
  const mission = launch.mission?.name || '';
  const statusText = launch.status?.name || '';
  const statusAbbr = launch.status?.abbrev || '';
  const imageUrl = launch.image || launch.rocket?.configuration?.image_url || '';

  return (
    <article className="rounded-xl border border-[#6E92B6]/40 bg-prussian_blue/60 p-4 flex flex-col gap-2 text-sm text-timberwolf">
      {imageUrl && (
        <div className="mb-3 rounded-lg overflow-hidden bg-prussian_blue/80">
          <img src={imageUrl} loading="lazy" alt={getLangText('rocketAlt')} className="w-full h-40 object-cover" />
        </div>
      )}
      <h3 className="text-base sm:text-lg font-heading text-timberwolf">{name}</h3>
      <p className="text-timberwolf/70"><span className="font-semibold">{getLangText('launchesOperatorLabel')}:</span> {provider}</p>
      <p className="text-timberwolf/70"><span className="font-semibold">{getLangText('launchesLocationLabel')}:</span> {location}</p>
      <p className="text-timberwolf/70"><span className="font-semibold">{getLangText('launchesTimeLabel')}:</span> {timeStr}</p>
      {mission && <p className="text-timberwolf/70"><span className="font-semibold">{getLangText('launchesMissionLabel')}:</span> {mission}</p>}
      {statusText && (
        <span className="inline-flex items-center self-start mt-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yinmn_blue/70 border border-[#6E92B6]/60">
          {statusAbbr ? `${statusAbbr} — ` : ''}{statusText}
        </span>
      )}
    </article>
  );
};

const ApodCard: React.FC<FullLangProps> = ({ lang, getLangText }) => {
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [status, setStatus] = useState<LangKey>('apodLoading');

    useEffect(() => {
        const fetchApod = async () => {
            setStatus('apodLoading');
            setApodData(null);
            try {
                const res = await fetch(APOD_API_URL);
                if (!res.ok) throw new Error('API error');
                const data: ApodData = await res.json();
                setApodData(data);
                setStatus(data.media_type === 'image' ? ('' as LangKey) : 'apodNoImage');
            } catch (error) {
                console.error("APOD fetch error:", error);
                setStatus('apodError');
            }
        };
        fetchApod();
    }, []);

    const formattedDate = apodData?.date
    ? new Date(apodData.date + "T00:00:00Z").toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : '';

    return (
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-[#6E92B6] via-transparent to-[#6E92B6]/80 h-full">
            <div className="h-full rounded-2xl bg-prussian_blue/80 border border-[#6E92B6]/60 p-4 md:p-5 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-yinmn_blue/70 text-[11px] font-semibold text-timberwolf/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300"></span>
                        <span>{getLangText('apodTitle')}</span>
                    </span>
                    <span className="text-[10px] text-timberwolf/60 hidden sm:block">{getLangText('apodSource')}</span>
                </div>
                
                {/* Image */}
                <div className="rounded-xl bg-prussian_blue/90 overflow-hidden flex-shrink-0">
                    <div className="aspect-video relative flex items-center justify-center">
                        {status === 'apodLoading' && (
                            <div className="w-full h-full bg-yinmn_blue/70 animate-pulse"></div>
                        )}
                        {apodData?.media_type === 'image' && (
                            <img src={apodData.url} alt={apodData.title || ''} className="w-full h-full object-cover" />
                        )}
                        {status && status !== 'apodLoading' && apodData?.media_type !== 'image' && (
                             <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-timberwolf/70 text-sm">
                                <span>{getLangText(status === 'apodError' ? 'apodError' : 'apodNoImage')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Date */}
                {formattedDate && (
                    <p className="text-sm text-timberwolf/70 flex-shrink-0 -mb-2">
                        {getLangText('apodDateLabel')}: {formattedDate}
                    </p>
                )}
                
                {/* Scrollable Description */}
                <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
                    <p className="text-sm text-timberwolf/90 leading-relaxed">
                        {apodData?.explanation || ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

const LaunchCardSkeleton = () => (
  <div className="rounded-xl border border-[#6E92B6]/40 bg-prussian_blue/60 p-4 space-y-3 animate-pulse">
    <div className="h-40 bg-yinmn_blue/70 rounded-lg"></div>
    <div className="h-5 bg-yinmn_blue/70 rounded w-3/4"></div>
    <div className="h-4 bg-yinmn_blue/70 rounded w-1/2"></div>
    <div className="h-4 bg-yinmn_blue/70 rounded w-5/6"></div>
    <div className="h-4 bg-yinmn_blue/70 rounded w-1/2"></div>
  </div>
);


const Launches: React.FC<FullLangProps> = ({ lang, getLangText }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [status, setStatus] = useState<LangKey>('launchesLoading');
  const [showAll, setShowAll] = useState(false);
  const [initialCount, setInitialCount] = useState(1);

  useEffect(() => {
    const getCount = () => {
      if (window.innerWidth >= 1280) return 3; // xl breakpoint for 3 columns
      if (window.innerWidth >= 640) return 2;  // sm breakpoint for 2 columns
      return 1; // mobile default
    };

    const handleResize = () => {
      setInitialCount(getCount());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchLaunches = async () => {
      setStatus('launchesLoading');
      try {
        const res = await fetch(LAUNCH_API_URL);
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        setLaunches(data.results || []);
        setStatus(data.results?.length ? ('' as LangKey) : 'launchesEmpty');
      } catch (err) {
        console.error("Launch fetch error:", err);
        setStatus('launchesError');
      }
    };
    fetchLaunches();
  }, []);

  const visibleLaunches = showAll ? launches.slice(0, MAX_COUNT) : launches.slice(0, initialCount);
  const canShowMore = launches.length > initialCount;

  return (
    <section id="launches" className="py-16 md:py-20 bg-gradient-to-b from-yinmn_blue via-yinmn_blue/95 to-prussian_blue border-t border-[#6E92B6]/40">
      <div className="container mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-blue_gray mb-1">{getLangText('launchesKicker')}</p>
            <h2 className="text-3xl sm:text-4xl font-heading">{getLangText('launchesTitle')}</h2>
            <p className="text-timberwolf/80 mt-2 text-sm md:text-base">{getLangText('launchesLead')}</p>
          </div>
          <span className="inline-flex items-center self-start md:self-end gap-2 px-3 py-1 rounded-full bg-prussian_blue/70 border border-[#6E92B6]/60 text-[11px] font-semibold text-timberwolf/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{getLangText('launchesLiveTag')}</span>
          </span>
        </div>
        <div className="grid md:grid-cols-5 gap-6 md:items-stretch">
          <div className="md:col-span-2">
            <ApodCard lang={lang} getLangText={getLangText} />
          </div>
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-heading">{getLangText('launchesListTitle')}</h3>
              <p className="text-timberwolf/70 text-[11px] md:text-xs">
                {status && status !== 'launchesLoading' ? getLangText(status) : ''}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {status === 'launchesLoading'
                ? Array.from({ length: initialCount }).map((_, i) => <LaunchCardSkeleton key={i} />)
                : visibleLaunches.map(launch => <LaunchCard key={launch.id} launch={launch} lang={lang} getLangText={getLangText} />)
              }
            </div>
            {canShowMore && (
              <div className="mt-1 text-center">
                <button onClick={() => setShowAll(!showAll)} className="px-4 py-2 rounded-lg border border-[#6E92B6]/60 bg-prussian_blue/70 text-timberwolf text-[12px] font-semibold hover:bg-prussian_blue/90 transition">
                  {getLangText(showAll ? 'launchesShowLess' : 'launchesShowMore')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Launches;