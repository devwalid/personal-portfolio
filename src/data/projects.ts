export interface Project {
  title: string;
  brand: string;
  video?: string;
  youtubeUrl?: string;
  youtubeEmbed?: string;
  stats?: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  projects: Project[];
}

export const categories: Category[] = [
  {
    slug: 'social-shorts',
    title: 'Social Shorts',
    description: 'Viral short-form content for YouTube Shorts, Instagram Reels, and TikTok — driving millions of views and massive engagement.',
    thumbnail: '/Videos/bf.mp4',
    projects: [
      {
        title: 'Burger Factory — First Ramadan',
        brand: 'BURGER FACTORY',
        youtubeUrl: 'https://www.youtube.com/shorts/Ao_VGRzQVxk',
        youtubeEmbed: 'https://www.youtube.com/embed/Ao_VGRzQVxk',
      },
      {
        title: 'Burger Factory — First Iftar',
        brand: 'BURGER FACTORY',
        youtubeUrl: 'https://www.youtube.com/shorts/K07kACN2Q40',
        youtubeEmbed: 'https://www.youtube.com/embed/K07kACN2Q40',
      },
      {
        title: 'Burger Factory — Customer has a question',
        brand: 'BURGER FACTORY',
        youtubeUrl: 'https://www.youtube.com/shorts/gIgIBEAbk48',
        youtubeEmbed: 'https://www.youtube.com/embed/gIgIBEAbk48',
      },
      {
        title: 'Burger Factory — Eid',
        brand: 'BURGER FACTORY',
        youtubeUrl: 'https://www.youtube.com/shorts/erXs7bupgXQ',
        youtubeEmbed: 'https://www.youtube.com/embed/erXs7bupgXQ',
      },
      {
        title: 'Pita Land — Eid',
        brand: 'PITA LAND',
        youtubeUrl: 'https://www.youtube.com/shorts/5oHHudnFzBM',
        youtubeEmbed: 'https://www.youtube.com/embed/5oHHudnFzBM',
      },
    ],
  },
  {
    slug: 'dtc-ugc-ad-creatives',
    title: 'DTC & UGC Ad Creatives',
    description: 'Direct-to-consumer and UGC-style ad videos designed to convert on paid social.',
    thumbnail: '/Videos/DTC.mp4',
    projects: [
      {
        title: 'Ad Creative',
        brand: 'ChocoBOOST',
        video: '/Videos/DTC.mp4',
      },
      {
        title: 'Ad Creative',
        brand: 'Survey Spin',
        video: '/Videos/ss.mp4',
      },
      {
        title: 'Ad Creative',
        brand: 'Euereka Surveys',
        video: '/Videos/eureka.mp4',
      },
      {
        title: 'Ad Creative',
        brand: 'Mothers Earth',
        video: '/Videos/10.mp4',
      },
    ],
  },
  {
    slug: 'talking-head',
    title: 'Talking Head Editing',
    description: 'Clean, engaging edits for coaches, experts, and thought leaders.',
    thumbnail: '/Videos/2.mp4',
    projects: [
      {
        title: 'Talking-Head Video',
        brand: 'CLIENT PROJECT',
        video: '/Videos/2.mp4',
      },
      {
        title: 'Talking-Head Video',
        brand: 'Adverb Marketing Agency',
        video: '/Videos/talkinghead2.mp4',
      },
    ],
  },
  {
    slug: 'matchup-videos',
    title: 'Matchup Videos',
    description: 'Side-by-side comparison and matchup content that keeps viewers hooked.',
    thumbnail: '/Videos/3.mp4',
    projects: [
      {
        title: 'Matchup Video',
        brand: 'CLIENT PROJECT',
        video: '/Videos/3.mp4',
      },
      {
        title: 'Matchup Video',
        brand: 'CLIENT PROJECT',
        video: '/Videos/UGC.mp4',
      },
      {
        title: 'Matchup Video',
        brand: 'CLIENT PROJECT',
        video: '/Videos/1.mp4',
      },
      {
        title: 'Matchup Video',
        brand: 'CLIENT PROJECT',
        video: '/Videos/IG-reels.mp4',
      },
    ],
  },
  {
    slug: 'long-to-short-form',
    title: 'Long-Form to Short-Form',
    description: 'Repurposing long-form content into scroll-stopping vertical clips.',
    thumbnail: '/Videos/long-to-short-form.mp4',
    projects: [
      {
        title: 'Long to Short-Form Repurpose',
        brand: 'CLIENT PROJECT',
        video: '/Videos/long-to-short-form.mp4',
      },
    ],
  },
];
