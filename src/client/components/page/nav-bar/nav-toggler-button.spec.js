import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Auth0Context } from '@src/util/auth0/auth0-context';
import NavTogglerButton from './nav-toggler-button';

jest.mock('@fortawesome/react-fontawesome');

describe('client/components/page/nav-bar/nav-toggler-menu-button', () => {
  const getComponent = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Router>
        <NavTogglerButton />
      </Router>
    </Auth0Context.Provider>
  );
  it('should render the dropdown', () => {
    // Arrange
    const auth = {
      login: jest.fn(),
    };
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);

    // Act
    const { getByText } = render(getComponent(auth));
    fireEvent.click(getByText(/Log in/));

    // Assert
    getByText(/Icon: sign-in-alt/);
    expect(auth.login).toHaveBeenCalledTimes(1);
  });
});
