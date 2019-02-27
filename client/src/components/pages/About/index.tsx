import * as React from 'react';
import Plx from 'react-plx';
import Header from 'src/components/parts/Header';
import { evaluateLinkableTextArray, evaluateLinkableTextKey, IAboutBlock } from 'src/models/content';
import store from 'src/redux/store';
import { Page, Section } from './styles';

const translateInc = 200;
const textData = [
  {
    start: 'self',
    // start: '.sticky-text',
    // duration: '60vh',
    // duration: '50vh',
    duration: `${translateInc}px`,
    properties: [
      { startValue: 0, endValue: -translateInc, unit: 'px', property: 'translateY' },
      { startValue: 0, endValue: 1, property: 'opacity' },
    ],
  },
  {
    start: 'self',
    // start: '.sticky-text',
    // startOffset: '100vh',
    startOffset: `${2 * translateInc}px`,
    // duration: '50vh',
    duration: `${translateInc}px`,
    properties: [
      { startValue: -translateInc, endValue: - 2 * translateInc, unit: 'px', property: 'translateY' },
      { startValue: 1, endValue: 0, property: 'opacity' },
    ],
  },
];

// const parallaxData1 = [
//   {
//     start: 'self',
//     end: 'self',
//     properties: [
//       {
//         startValue: 1,
//         endValue: 2,
//         property: 'translateY',
//       },
//     ],
//   },
// ];
// const parallaxData2 = [
//   {
//     start: 100,
//     end: 200,
//     freeze: true,
//     properties: [
//       {
//         startValue: 1,
//         endValue: 2,
//         property: 'translateY',
//       },
//     ],
//   },
// ];

class AboutProjectPage extends React.Component
{
  state: { about: IAboutBlock[] };
  constructor(props: any)
  {
    super(props);
    this.state = { about: store.getState().content.about };
  }

  public render()
  {
    const about = this.state.about;
    return (
      <div>
        <Header />
        <Page className='container'>
          {/* <Plx
            className='MyAwesomeParallax'
            parallaxData={parallaxData1}
          > */}
          <div className='start'>
            <div className='description'>
              Welcome to my personal website.
            </div>
            <div className='description'>
              I made this site to display my skills in software development to potential clients, employers and/or headhunters.
            </div>
            <div className='description'>
              Take a minute to appreciate everything that's going on in the background to make this site run.
            </div>
          </div>
          <span className='sticky-text'/>
          {/* </Plx> */}
          {about.map((block) =>
            <Plx key={`${block.id}`} parallaxData={textData}>
              <React.Fragment>
                {this.evaluateBlock(block)}
              </React.Fragment>
            </Plx>
          )}
        </Page>
      </div >
    );
  }

  evaluateBlock(b: IAboutBlock): JSX.Element
  {
    const underline = (!b.subtitle) ? (' underline') : ('');
    const evaluateArray = evaluateLinkableTextArray;
    return (
      <Section>
        <div className={`title ${underline}`}>{evaluateArray(b.title)}</div>
        {b.subtitle && <div className='subtitle'>{evaluateArray(b.subtitle)}</div>}
        {b.description && <div className='description'>{evaluateArray(b.description)}</div>}
        {!b.features && <div className='description'>Not yet implemented</div>}
        {b.features && <ul>
          {b.features && b.features.map((feature) =>
            <li key={evaluateLinkableTextKey(feature[0])}>{evaluateArray(feature)}</li>
          )}
        </ul>}
      </Section>
    );
  }
}

export default AboutProjectPage;
