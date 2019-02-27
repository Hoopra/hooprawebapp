import { IAboutBlock, IDeveloperSkill, ITimelineBlock } from './../../../models/content';

export const timelineBlocks: ITimelineBlock[] = [
  {
    // icon: 'flash_on',
    image: '/assets/images/timeline/logo_zigna.jpg',
    title: 'zigna',
    subtitle: 'Lead Developer',
    body: ` At zigna the mission was always clear: Present real estate agents with state of the art tools for their efforts to sell properties.
    We started from scratch by building a web platform in Angular 2 for US customers and adding the new tools afterwards. We are currently localizing the same platform to also function in Denmark.
    As lead developer I designed APIs for all the new tools and managed a frontend team which varied time between 2-4 members.`,
    keywords: 'Angular 6, Node.js, MongoDB, AWS, NGINX, Real estate',
    formattedDate: '2017 - 2018',
  },
  {
    image: '/assets/images/timeline/logo_gq.jpg',
    title: 'getQueried',
    subtitle: 'Developer',
    body: ` Where I first got interested in startups. At getQueried we aimed high and tried to build a social software platform primarily for mobile devices.
    I functioned as lead mobile developer and was responsible for building our prototype iOS app. In some periods I also helped develop our backend further.
    Keywords: Mobile, iOS, Swift, Google Go, PostgreSQL, scalability, social networking`,
    formattedDate: '2015 - 2017',
  },
  {
    image: '/assets/images/timeline/logo_cowi.jpg',
    title: 'COWI',
    subtitle: 'Engineer',
    body: ` At COWI I worked on software-based approaches to several large-scale building projects in Denmark and Qatar.
    I often consulted with subcontractors and specialists and had business trips to Rome and Doha, Qatar.`,
    formattedDate: '2013 - 2015',
  },
  {
    image: '/assets/images/timeline/logo_dtu.jpg',
    title: 'Technical University of Denmark',
    subtitle: `Master's degree in engineering`,
    body: `Master's degree in engineering`,
    formattedDate: '2013',
  },
  {
    image: '/assets/images/timeline/logo_dtu.jpg',
    title: 'Technical University of Denmark',
    subtitle: `Bachelor's degree in engineering`,
    body: `Bachelor's degree in engineering`,
    formattedDate: '2010',
  },
];

export const skills: IDeveloperSkill[] = [
  {
    id: 'backend',
    title: ['Backend'],
    subtitle: ['Backend skills'],
    features: [
      ['Symfony (PHP)'],
      ['Golang'],
      ['Express.js (Node)'],
      ['Django (Python)'],
      ['REST servers'],
      ['JSON web tokens (', { text: 'JWT', url: 'https://jwt.io' }, ')'],
      ['.NET (C#)'],
      ['NGINX'],
    ],
  },
  {
    id: 'database',
    title: ['Database'],
    subtitle: ['Database skills'],
    features: [
      ['SQL', ' - PostgreSQL'],
      ['MongoDB'],
    ],
  },
  {
    id: 'frontend',
    title: ['Frontend'],
    subtitle: ['Frontend skills'],
    features: [
      ['React'],
      ['React Native'],
      ['Angular'],
      ['Unity'],
      ['iOS (Swift)'],
    ],
  },
  {
    id: 'testing',
    title: ['Testing'],
    subtitle: ['Testing skills'],
    features: [
      ['Protractor'],
      ['Mocha'],
      ['Jasmine '],
      ['PHP Unit'],
      ['Codeception'],
      ['Jest'],
      ['PyUnit'],
    ],
  },
  {
    id: 'architecture',
    title: ['Architecture'],
    subtitle: ['Architecture skills'],
    features: [
      ['Docker'],
      ['Cloud distribution'],
      ['Server clustering'],
      ['Auto-scaling groups'],
      ['Amazon Web Services'],
      ['Kubernetes'],
      ['Microsoft Azure'],
      ['Content Delivery Networks'],
    ],
  },
  {
    id: 'integrations',
    title: ['API integrations'],
    subtitle: ['API integration skills'],
    features: [
      ['Google Maps'],
      ['Google Analytics'],
      ['Google Ads'],
      ['Facebook Graph'],
      ['Facebook Marketing'],
      ['Facebook Business'],
    ],
  },
  {
    id: 'analytics',
    title: ['Analytics'],
    subtitle: ['Analytics skills'],
    features: [
      ['Google Analytics'],
      ['Firebase'],
      ['Hotjar'],
      ['Mixpanel'],
    ],
  },
  {
    id: 'miscellaneous',
    title: ['Miscellaneous'],
    subtitle: ['Miscellaneous skills'],
    features: [
      ['Blender 2D/3D'],
      ['git'],
      ['Agile project management'],
    ],
  },
  {
    id: 'personal',
    title: ['Personal skills'],
    subtitle: ['Personal skills'],
    features: [
      ['Super organized'],
      ['Super passionate'],
      ['Systematic mindset'],
      ['Persistent inner calm'],
    ],
  },
];

export const about: IAboutBlock[] = [
  {
    id: 'frontend',
    title: ['Frontend client'],
    subtitle: ['this website'],
    features: [
      [{ text: 'React (v16.6)', url: 'https://reactjs.org/versions' }],
      [
        'Redux (inspect with ',
        { text: 'Redux DevTools', url: 'https://github.com/zalmoxisus/redux-devtools-extension' },
        ')'
      ],
      [{ text: 'Styled components', url: 'https://www.styled-components.com' }],
      [{ text: 'Materialize for React', url: 'https://react-materialize.github.io' }],
    ]
  },
  {
    id: 'backend',
    title: ['Backend/API'],
    features: [
      ['written in ', { text: 'Golang', url: 'https://golang.org/' }],
      [{ text: 'Postgres ', url: 'https://www.postgresql.org/' }, 'database (SQL)'],
      ['Authentication using ', { text: 'JWT', url: 'https://jwt.io' }],
    ],
  },
  {
    id: 'hosting',
    title: ['Hosting'],
  },
  {
    id: 'ci',
    title: ['Continuous integration'],
  },
  {
    id: 'cd',
    title: ['Continuous delivery'],
  },
];
