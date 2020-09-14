import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavTogglerMenu from './nav-toggler-menu';

jest.mock('@fortawesome/react-fontawesome');

jest.mock('./nav-toggler-menu-item', () => () => (<div>Nav Toggler Menu Item</div>));
jest.mock('./nav-toggler-menu-logout', () => () => (<div>Nav Toggler Menu Logout</div>));

describe('client/components/page/nav-bar/nav-toggler-menu', () => {
  const getComponent = () => (
    <Router>
      <NavTogglerMenu />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);

    // Act
    const { getByText, getAllByText } = render(getComponent());

    // Assert
    getByText(/Nav Toggler Menu Logout/);
    const tabs = getAllByText(/Nav Toggler Menu Item/);
    expect(tabs.length).toBe(2);
  });
});
