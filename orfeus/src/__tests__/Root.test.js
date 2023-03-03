import Root from '../views/root/Root';
import { NavLink, MemoryRouter } from 'react-router-dom';

import { mount } from 'enzyme';

describe('Navbar', () => {
  it('contains NavLink to other pages/rendering', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );

    const homeLink = wrapper.find(NavLink).find({ to: '/' });
    const libraryLink = wrapper.find(NavLink).find({ to: '/library' });
    const aboutLink = wrapper.find(NavLink).find({ to: '/about' });
    const loginLink = wrapper.find(NavLink).find({ to: '/login' });
    const signUpLink = wrapper.find(NavLink).find({ to: '/signUp' });

    expect(homeLink).toHaveLength(2);
    expect(libraryLink).toHaveLength(2);
    expect(aboutLink).toHaveLength(2);
    expect(loginLink).toHaveLength(2);
    expect(signUpLink).toHaveLength(2);
  });
});
