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

class RegisterPage extends React.Component
{
  public static propTypes = {
    registerUser: PropTypes.func.isRequired,
  };

  public state: IComponentState = {
    name: '', email: '',
    password: '', repeatPassword: '',
  };

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
          <h1>Register</h1>
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
          <button onClick={this.registerUser}>Register</button>
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
    // store.dispatch<any>(
    AuthActions.registerUser(userData);
    // );
    this.setState({});
  }

  private onInputChange(e: any)
  {
    this.setState({ [e.target.name]: e.target.value });
  }
}

const { registerUser } = AuthActions;
export default connect(null, { registerUser })(RegisterPage);
