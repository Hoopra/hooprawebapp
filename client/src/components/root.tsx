import * as $ from 'jquery';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { WindowStorage } from 'src/utilities/window';
import { AuthActions } from '../redux/actions/auth';
import store from '../redux/store';
import AboutProjectPage from './pages/About';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import MySkillsPage from './pages/Skills';
import TimelinePage from './pages/Timeline';
import { StyleBody } from './styles/root';

class RootComponent extends React.Component
{
  constructor(props: any) { super(props); }

  public componentDidMount()
  {
    // Import Google fonts
    addStyle('https://fonts.googleapis.com/icon?family=Material+Icons');
    addStyle('https://fonts.googleapis.com/css?family=Niramit');
    addStyle('https://fonts.googleapis.com/css?family=Roboto:300,400,500');

    // Import Materialize styles
    addStyle('https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css');

    // Ensure jquery is defined
    (window as any).$ = $;

    // Import Materialize script
    addScript('https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js');

    const accessToken = WindowStorage.find('access_token');
    AuthActions.applyExistingToken(accessToken);

    // console.log(this.props);
    // if (!store.getState().auth.isAuthenticated)
    // {
    // AuthActions.loginUser({ email: 'thomas@zigna.com', name: 'Thomas' });
    // setTimeout(() => { logoutUser(); }, 5000);
    // registerUser({ email: 'thomas@zigna.com', password: '123456' });
    // }
  }

  public render(): JSX.Element
  {
    return (
      <StyleBody>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact={true} path='/' component={AboutProjectPage} />
              <Route exact={true} path='/register' component={RegisterPage} />
              <Route exact={true} path='/timeline' component={TimelinePage} />
              <Route exact={true} path='/about' component={AboutProjectPage} />
              <Route exact={true} path='/skills' component={MySkillsPage} />
              <Route exact={true} path='/login' component={LoginPage} />
              <Route component={TimelinePage} />
            </Switch>
          </Router>
        </Provider>
      </StyleBody>
    );
  }
}

function addScript(url: string) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
}

function addStyle(url: string)
{
  const link = document.createElement('link');
  link.href = url;
  link.rel = 'stylesheet';
  if (document.head)
  { document.head.appendChild(link); }
}

export default RootComponent;
