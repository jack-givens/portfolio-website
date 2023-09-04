import { ApiRoute } from './service-base';

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tech: string[];
};

const projectData: Project[] = [
  {
    title: 'Clearcover Car Insurance',
    subtitle: 'Mobile App for Policyholders',
    description:
      'A cross-platform mobile app that allows policyholders to submit claims, make endorsements, and view their auto policy',
    image: require('../assets/cc.png'),
    tech: [
      'React Native',
      'Firebase',
      'ExpressJS',
      'Kubernetes',
      'Kafka',
      'PostgreSQL'
    ]
  },
  {
    title: 'Polkie',
    subtitle: 'Social Media Advertising',
    description:
      'An advertising platform that allows advertisers to connect with social media influencers',
    image: require('../assets/polkie.png'),
    tech: [
      'React',
      'React Native',
      'ASP.NET Core',
      'MSSQL',
      'Prometheus',
      'Redis',
      'Kubernetes'
    ]
  },
  {
    title: 'VirtualConnect',
    subtitle: 'Virtual Events Platform',
    description:
      'A multitenant livestreaming platform with realtime chat, group meetings, ticketing integrations, polls, and gamification',
    image: require('../assets/vcl2.png'),
    tech: ['Vue', 'ASP.NET Core', 'MSSQL', 'WebSockets', 'WebRTC']
  },
  {
    title: 'TherapiCart',
    subtitle: 'Shopping Without Spending',
    description:
      'A browser extension that dynamically creates a custom checkout page on shopping sites to simulate real shopping',
    image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
    tech: ['Vue', 'ManifestV3 Extension API', 'NodeJS', 'MSSQL']
  },
  {
    title: 'Rhythm Mania',
    subtitle: 'Mobile Rhythm Game',
    description:
      'A competitive, multiplayer rhythm game akin to stepmania or tap-tap revenge, for IOS and Android',
    image: require('../assets/rhythm.png'),
    tech: ['Unity3D', 'Firebase']
  },
  {
    title: 'VibeMatch',
    subtitle: 'Machine-Learning Playlist Creator',
    description:
      'A small proof-of-concept site that generates a recommended playlist based off of a seed song',
    image: require('../assets/vm2.png'),
    tech: ['Vue', 'ASP.NET Core', 'Machine Learning', 'KNN']
  },
  {
    title: 'Connect',
    subtitle: 'Patient Portal',
    description:
      'A cross-platform portal for patients to submit forms, contact their doctor, upload documents, and view medication schedules',
    image: require('../assets/connect.png'),
    tech: ['Vue', 'NativeScript-Vue', 'Firebase Cloud Messaging', 'ExpressJS']
  }
];

export class Projects extends ApiRoute {
  getProjects = (): Promise<Project[]> =>
    this.Utils.delay([...projectData], 500);
}
