import { mount } from 'enzyme';
import Root from '../views/root/Root';
import { NavLink, Outlet, useLocation, BrowserRouter } from 'react-router-dom';
import root_styles from './Root.module.css';
import jwt_decode from 'jwt-decode';

describe('Navbar', () => {
  it('contains NavLink to other pages/rendering', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );
    console.log(wrapper.debug({ verbose: true }));
    const homeLink = wrapper.find(NavLink).find({ to: '/' });
    const libraryLink = wrapper.find(NavLink).find({ to: '/library' });
    const aboutLink = wrapper.find(NavLink).find({ to: '/about' });
    const loginLink = wrapper.find(NavLink).find({ to: '/login' });
    const signUpLink = wrapper.find(NavLink).find({ to: '/signUp' });
    console.log(homeLink.debug());

    expect(homeLink).toHaveLength(1);
    expect(libraryLink).toHaveLength(1);
    expect(aboutLink).toHaveLength(1);
    expect(loginLink).toHaveLength(1);
    expect(signUpLink).toHaveLength(1);

    // expect(homeLink.text()).equal('Home');
    // expect(libraryLink.text()).equal('Library');
    // expect(aboutLink.text()).equal('About');
    // expect(loginLink.text()).equal('Login');
    // expect(signUpLink.text()).equal('Sign Up');
  });
});
