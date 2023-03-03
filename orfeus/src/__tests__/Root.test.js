import Root from '../views/root/Root';
import { NavLink, Outlet, useLocation, BrowserRouter } from 'react-router-dom';
import root_styles from './Root.module.css';
import jwt_decode from 'jwt-decode';

import { mount } from 'enzyme';

describe('Navbar', () => {
  it('contains NavLink to other pages/rendering', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    const homeLink = wrapper.find(NavLink).find({ to: '/' });
    const libraryLink = wrapper.find(NavLink).find({ to: '/library' });
    const aboutLink = wrapper.find(NavLink).find({ to: '/about' });
    const loginLink = wrapper.find(NavLink).find({ to: '/login' });
    const signUpLink = wrapper.find(NavLink).find({ to: '/signUp' });
    console.log(homeLink.debug());

    expect(homeLink).toHaveLength(2);
    expect(libraryLink).toHaveLength(2);
    expect(aboutLink).toHaveLength(2);
    expect(loginLink).toHaveLength(2);
    expect(signUpLink).toHaveLength(2);

    // expect(homeLink.text()).equal('Home');
    // expect(libraryLink.text()).equal('Library');
    // expect(aboutLink.text()).equal('About');
    // expect(loginLink.text()).equal('Login');
    // expect(signUpLink.text()).equal('Sign Up');
  });
});
