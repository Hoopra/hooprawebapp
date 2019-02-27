import * as React from 'react';
import { matchStrings } from 'src/utilities/string';
import { openTab } from '../utilities/navigate';

export interface ITimelineBlock
{
  title: string;
  subtitle?: string;
  body: string;
  keywords?: string;

  icon?: string;
  image?: string;

  expanded?: boolean;
  date?: Date;
  formattedDate?: string;
}

interface ILinkBlock { text: string; url: string; }
export type TLinkableText = string | ILinkBlock;

type TAboutBlockState = 'open' | 'closed';

interface IContentBlock
{
  id: string;
  title: TLinkableText[];
  features?: TLinkableText[][];
}

export interface IAboutBlock extends IContentBlock
{
  description?: TLinkableText[];
  subtitle?: TLinkableText[];
}

export interface IDeveloperSkill extends IContentBlock
{
  state?: TAboutBlockState;
  subtitle: TLinkableText[];
}

export function evaluateLinkableTextArray(lts: TLinkableText[]): JSX.Element
{
  return (
    <React.Fragment>
      {lts.map((section) =>
        <React.Fragment key={`${section}`}>{evaluateLinkableText(section)}</React.Fragment>
      )}
    </React.Fragment>
  );
}

export function evaluateLinkableTextKey(lt: TLinkableText): string
{
  return (typeof lt === 'string') ? (lt) : (lt.text);
}

export function evaluateLinkableText(lt: TLinkableText): JSX.Element
{
  const showTab = (url: string) => () => { openTab(url); };
  if (typeof lt === 'string')
  {
    const last = lt[lt.length - 1];
    if (last !== ' ') { return (<React.Fragment>{lt}</React.Fragment>); }
    return (<React.Fragment>{lt.slice(0, lt.length - 1)}&nbsp;</React.Fragment>);
  }
  return (
    <span className='link' onClick={showTab(lt.url)}>{lt.text}</span>
  );
}

export function matchBlockToSearchValue(block: IAboutBlock, search: string): boolean
{
  const match = matchLinkableTextArrayToSearchValue;
  if (match(block.title, search)) { return true; }
  if (block.subtitle && match(block.subtitle, search)) { return true; }
  if (!block.features) { return false; }

  for (const feature of block.features)
  {
    if (match(feature, search)) { return true; }
  }

  return false;
}

export function matchLinkableTextArrayToSearchValue(lts: TLinkableText[], search: string): boolean
{
  for (const lt of lts)
  {
    const compare = (typeof lt === 'string') ? (lt) : (lt.text);
    if (matchStrings(compare, search)) { return true; }
  }

  return false;
}


