import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { AuthActions } from '../../../redux/actions/auth';
import store from '../../../redux/store';
import { navigateTo } from '../../../utilities/navigate';
import { Page } from './styles';

interface IComponentState
{
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

class LoginPage extends React.Component
{
  public static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };

  public state: IComponentState = {
    name: '', email: '',
    password: '', repeatPassword: '',
  };

  // public get history() { return (this.props as any).history; }
  // private get storeState() { return store.getState(); }

  constructor(props: any)
  {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    store.subscribe(() =>
    {
      if (store.getState().auth.isAuthenticated)
      { navigateTo('/dashboard'); }
    });
  }

  public render()
  {
    // const user = this.storeState.user;

    return (
      <Page>
        <div className='container'>
          {/* <h1>Hello {user ? user.name : ''}</h1> */}
          <h1>Login</h1>
          <input
            // className=''
            type='text'
            name='name'
            value={this.state.name}
            onChange={this.onInputChange}
          />
          <input
            // className='password'
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.onInputChange}
          />
          <button onClick={this.registerUser}>Login</button>
        </div>
      </Page>
    );
  }

  private registerUser()
  {
    const userData = {
      name: this.state.name,
      password: this.state.password,
    };
    AuthActions.loginUser(userData);
    // this.setState({});
  }

  private onInputChange(e: any)
  {
    this.setState({ [e.target.name]: e.target.value });
  }
}

const { loginUser } = AuthActions;
export default connect(null, { loginUser })(LoginPage);
