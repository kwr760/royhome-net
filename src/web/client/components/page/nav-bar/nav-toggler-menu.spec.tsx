import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import NavTogglerMenu from './nav-toggler-menu';
import NavTogglerMenuLogout from './nav-toggler-menu-logout';
import NavTogglerMenuItem from './nav-toggler-menu-item';

jest.mock('react-icons/fi');
jest.mock('react-icons/vsc');
jest.mock('./nav-toggler-menu-logout');
jest.mock('./nav-toggler-menu-item');

describe('client/components/page/nav-bar/nav-toggler-menu', () => {
  const getComponent = () => (
    <Router>
      <NavTogglerMenu />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    (NavTogglerMenuLogout as jest.Mock).mockImplementation(() => <div>Nav Toggler Menu Logout</div>);
    (NavTogglerMenuItem as jest.Mock).mockImplementation(() => <div>Nav Toggler Menu Item</div>);

    // Act
    const { getByText, getAllByText } = render(getComponent());

    // Assert
    getByText(/Nav Toggler Menu Logout/);
    const tabs = getAllByText(/Nav Toggler Menu Item/);
    expect(tabs.length).toBe(2);
  });
});
