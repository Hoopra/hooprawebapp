import * as React from 'react';
import Tooltip from 'react-tooltip-lite';
import Header from 'src/components/parts/Header';
import { evaluateLinkableTextArray, IDeveloperSkill, matchBlockToSearchValue } from 'src/models/content';
import store from '../../../redux/store';
import { Page, Section } from './styles';

class MySkillsPage extends React.Component
{
  state: {
    skills: IDeveloperSkill[],
    search: string,
    afterSearch: boolean,
  };

  constructor(props: any)
  {
    super(props);
    this.state = {
      skills: store.getState().content.skills,
      search: '', afterSearch: false,
    };
  }

  public render()
  {
    const { search, afterSearch } = this.state;
    let { skills } = this.state;
    if (search.length >= 2)
    { skills = this.filterContent(skills, search); }
    if (afterSearch)
    {
      this.collapseBlocks(-1, false)();
      this.state.afterSearch = false;
    }
    if (skills.length === 1)
    { skills[0].state = 'open'; }

    return (
      <div onClick={this.collapseBlocks(-1, true)}>
        <Header />
        <Page className='container'>
          <div className='description'>
            <div>This page lists my primary developer skills by category.</div>
            <div>You can browse categories or search for specific topics.</div>
          </div>
          <input
            className='search'
            type='text' placeholder='Search...'
            value={this.state.search}
            onChange={this.onSearch()}
          />
          {skills.map((block, i) =>
            <React.Fragment key={`${block.id}`}>
              {this.evaluateBlock(block, i)}
            </React.Fragment>
          )}
        </Page>
      </div>
    );
  }

  evaluateBlock(section: IDeveloperSkill, index: number): JSX.Element
  {
    const closed = (!section.state || section.state === 'closed');
    const expandedClass = (!closed) ? (' expanded') : ('');
    return (
      <Section className={expandedClass}>
        <Tooltip content='Click to expand/collapse'>
          <div className='title' onClick={this.toggleBlock(index)}>
            <span>
              {!closed && '-'} {closed && '+'}
            </span>
            <span>{evaluateLinkableTextArray(section.title)}</span>
          </div>
        </Tooltip>

        <div className='body'>
          {/* {!closed && */}
            <ul>
              {section.features && section.features.map((feature) =>
                <li key={`${feature}`}>{evaluateLinkableTextArray(feature)}</li>
              )}
            </ul>
          {/* } */}
        </div>
      </Section>
    );
  }

  collapseBlocks(ignoreIndex: number, forceUpdate = true)
  {
    return () =>
    {
      const skills = this.state.skills;
      for (let i = 0; i < skills.length; i++)
      {
        if (i !== ignoreIndex) { skills[i].state = 'closed'; }
      }
      if (forceUpdate)
      { this.setState({ skills }); }
    };
  }

  toggleBlock(index: number)
  {
    return (event: React.MouseEvent) =>
    {
      event.stopPropagation();
      const skills = this.state.skills;
      this.collapseBlocks(index, false)();
      const block = skills[index];
      const state = block.state;
      block.state = (!state || state === 'closed') ? ('open') : ('closed');

      skills.splice(index, 1);
      skills.unshift(block);

      this.setState({ skills });
    };
  }

  onSearch()
  {
    return (event: React.ChangeEvent) =>
    {
      this.setState({
        search: (event.target as HTMLInputElement).value,
        afterSearch: true,
      });
    };
  }

  filterContent(content: IDeveloperSkill[], search: string): IDeveloperSkill[]
  {
    const filtered: IDeveloperSkill[] = [];
    for (const block of content)
    {
      const match = matchBlockToSearchValue(block, search);
      if (match) { filtered.push(block); }
    }
    return filtered;
  }
}

export default MySkillsPage;
