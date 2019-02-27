import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import store from '../../../redux/store';
import { navigateTo } from '../../../utilities/navigate';
import { Navbar, Sidebar } from './styles';

const menuItems = [
  { title: 'This project', link: 'about' },
  { title: 'Timeline', link: 'timeline' },
  { title: 'About me', link: 'skills' },
];

class Register extends React.Component
{
  state = {
    showMenu: false,
  };

  constructor(props: any)
  {
    super(props);
    store.subscribe(() =>
    {
      if (store.getState().auth.isAuthenticated)
      { navigateTo('/dashboard'); }
    });
  }

  public render()
  {
    return (
      <Navbar role='navigation' className='page-header cyan z-depth-1'>
        <div className='nav-wrapper container'>

          <Link className='brand-logo' to=''>Hoopra</Link>
          {/* <ul id='slide-out' className='side-nav darken-1'>
            {this.generateButtons('', 'btn waves-effect waves-light')}
          </ul> */}

          <a className='button-collapse sidenav-trigger' data-activates='slide-out' data-target='slide-out' onClick={this.toggleMenu()}>
            <i className='material-icons'>menu</i>
          </a>

          <ul id='nav' className='right hide-on-med-and-down'>
            {this.generateButtons('', 'btn cyan waves-effect waves-light lighten-1')}
          </ul>

        </div>

        {
          this.state.showMenu &&
          <Sidebar id='slide-out' onClick={this.toggleMenu()}>
            {this.generateButtons('z-depth-2', 'btn cyan darken-1 waves-effect waves-light')}
          </Sidebar>
        }
      </Navbar>
    );
  }

  generateButtons(outerClass: string, innerClass: string): JSX.Element
  {
    return (
      <div className={outerClass}>
        {menuItems.map((item) =>
          <li key={item.link}>
            <Link className={innerClass} to={item.link}>{item.title}</Link>
          </li>
        )}
      </div>
    );
  }

  toggleMenu()
  {
    return () =>
    { this.setState({ showMenu: !this.state.showMenu }); };
  }
}

// const { loginUser } = AuthActions;
export default connect(null, {})(Register);
