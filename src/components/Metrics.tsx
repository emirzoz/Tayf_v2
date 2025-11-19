import React, { useEffect, useRef, useState } from 'react';
import type { LangProps } from '../types';

const MetricItem: React.FC<{ target: number, label: string, suffix?: string, isCompact?: boolean }> = ({ target, label, suffix = '', isCompact = false }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        if (inView && ref.current) {
            let start: number | null = null;
            const duration = 1200;
            const formatCompact = (n: number) => new Intl.NumberFormat('tr-TR', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
            
            const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const value = progress * target;
                if (ref.current) {
                    ref.current.textContent = (isCompact ? formatCompact(value) : Math.round(value).toString());
                }
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    if (ref.current) {
                        ref.current.textContent = (isCompact ? formatCompact(target) : target.toString());
                    }
                }
            };
            requestAnimationFrame(animate);
        }
    }, [inView, target, suffix, isCompact]);
    
    return (
        <div className="space-y-1">
            <div className="text-3xl sm:text-4xl md:text-5xl font-heading text-timberwolf tabular-nums">
                <span ref={ref}>0</span>{suffix}
            </div>
            <p className="text-timberwolf/80">{label}</p>
        </div>
    );
};

const Metrics: React.FC<LangProps> = ({ getLangText }) => {
  return (
    <section id="metrics" className="bg-gradient-to-br from-yinmn_blue to-prussian_blue text-timberwolf border-t border-[#6E92B6]/30">
      <div className="container mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        <MetricItem target={12} label={getLangText('metricsTest')} suffix="+" />
        <MetricItem target={1800000} label={getLangText('metricsAccess')} suffix="+" isCompact={true} />
        <MetricItem target={25} label={getLangText('metricsMembers')} />
        <MetricItem target={9} label={getLangText('metricsPartners')} />
        <div className="col-span-2 md:col-span-1">
             <MetricItem target={600} label={getLangText('metricsHours')} suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default Metrics;