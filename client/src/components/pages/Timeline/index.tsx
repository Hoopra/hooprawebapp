import * as $ from 'jquery';
import * as React from 'react';
import Header from 'src/components/parts/Header';
import { ITimelineBlock } from '../../../models/content';
import store from '../../../redux/store';
// import { Parallax } from 'react-materialize';
// import { ParallaxContainer } from '../Landing/styles';
import { Timeline } from './styles';

const timelines: HTMLElement[] = [];
const classes = {
  wrapper: '.timeline-wrapper', block: '.timeline-block',
  image: '.image', content: '.content',
  hidden: 'hidden', bounce: 'bounce-in',
};
const offset = 0.8;
const boundary = window.innerHeight * offset;

class TimelinePage extends React.Component
{
  state: { blocks: ITimelineBlock[] };

  constructor(props: any)
  {
    super(props);
    this.state = { blocks: store.getState().content.timelineBlocks }; // { blocks: timelineBlocks };

    if (!this.state.blocks) { return; }
    this.state.blocks.forEach(block =>
    {
      if (block.formattedDate || !block.date) { return; }
      block.formattedDate = block.date.toDateString();
    });
  }

  componentDidMount()
  {
    window.addEventListener('scroll', () => { showBlocks(); });
    $(classes.wrapper).find(classes.block).toArray().forEach((element) =>
    { timelines.push(element); });
    showBlocks();
  }

  public render()
  {
    const blocks = this.state.blocks;
    return (
      <div>
        <Header />
        <Timeline>
          <div className='timeline-wrapper'>
            <div className='timeline'>
              {blocks.map((block: ITimelineBlock) =>
                this.evaluateBlock(block)
              )}
            </div>
          </div>
        </Timeline>
      </div>
    );
  }

  private evaluateBlock(block: ITimelineBlock)
  {
    return (
      <div key={`${block.subtitle}/${block.title}`} className='timeline-block hidden'>
        <div className='image'>
          {block.icon && <i className='material-icons'>{block.icon}</i>}
          {block.image && <img src={block.image} />}
        </div>

        <div className='content'>
          <div className='main'>
            <h2 className='title'>{block.title}</h2>
            {block.subtitle && <h3 className='subtitle'>{block.subtitle}</h3>}
            <p className={`body ${block.expanded ? 'expanded' : ''}`}>
              {block.body}
              {!block.expanded && <span className='edge' />}
            </p>
          </div>
          {block.keywords &&
            <div className='keywords'>
              <h3>Keywords</h3>
              <p>{block.keywords}</p>
            </div>
          }
          <span className='date'>{block.formattedDate}</span>
          <div onClick={this.toggleExpanded(block)} className='read-more'>
            {block.expanded && <i className='material-icons'>arrow_drop_up</i>}
            {!block.expanded && <i className='material-icons'>arrow_drop_down</i>}
          </div>
        </div>
      </div>
    );
  }

  private toggleExpanded(block: ITimelineBlock)
  {
    return () =>
    {
      block.expanded = !block.expanded;
      this.setState({});
    };
  }
}
export default TimelinePage;

// function queryAnimationLoop(completion: () => (void)): void
// {
//   if (!window.requestAnimationFrame)
//   {
//     setTimeout(() => { queryAnimationLoop(completion); }, 250);
//   }
//   else
//   { window.requestAnimationFrame(completion); }
// }

/**
* Hides all timeline blocks outside of view.
*/
// export function hideBlocks(): void
// {
//   const blocks = $(classes.wrapper).find(classes.block);
//   blocks.toArray().forEach((block: HTMLElement) =>
//   {
//     const image = $(block).find(classes.image)[0];
//     const content = $(block).find(classes.content)[0];
//     const top = block.getBoundingClientRect().top;

//     if (top <= boundary) { return; }
//     modifyClasses([content, image], classes.hidden);
//   });
// }

/**
* Shows all timeline blocks in view.
*/
function showBlocks(): void
{
  timelines.forEach((block: HTMLElement) =>
  {
    const top = block.getBoundingClientRect().top;
    const image = $(block).find(classes.image)[0];
    const content = $(block).find(classes.content)[0];

    if (top > boundary) { return; }
    modifyClasses([content, image], classes.bounce);
    modifyClasses([content, image], classes.hidden, false);
  });
}

/**
* Adds or removes classes to HTML elements.
*/
function modifyClasses(elements: HTMLElement[], classlist: string, add = true): void
{
  elements.forEach((element) =>
  {
    (add) ? (element.classList.add(classlist)) : (element.classList.remove(classlist));
  });
}
