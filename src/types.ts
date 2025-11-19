
import { langData } from './constants';

export type Language = 'tr' | 'en';

export type LangKey = keyof (typeof langData)['tr'];

export interface LangProps {
  getLangText: (key: LangKey) => string;
}

export interface FullLangProps extends LangProps {
  lang: Language;
}

export interface Launch {
  id: string;
  name: string;
  window_start: string;
  net: string;
  last_updated: string;
  launch_service_provider?: {
    name: string;
  };
  pad?: {
    name: string;
    location?: {
      name: string;
    };
  };
  mission?: {
    name: string;
  };
  status?: {
    name: string;
    abbrev: string;
  };
  image?: string;
  rocket?: {
    configuration?: {
      image_url: string;
    }
  }
}

export interface ApodData {
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: string;
    title: string;
    url: string;
}
