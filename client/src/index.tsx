import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './base/index.css';
import registerServiceWorker from './base/registerServiceWorker';
import RootComponent from './components/root';

ReactDOM.render(
  <RootComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
