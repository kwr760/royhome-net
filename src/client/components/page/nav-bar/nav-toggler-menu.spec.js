import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import NavTogglerMenu from './nav-toggler-menu';

jest.mock('react-icons/fi');
jest.mock('react-icons/vsc');
jest.mock('./nav-toggler-menu-item', () => () => (<div>Nav Toggler Menu Item</div>));
jest.mock('./nav-toggler-menu-logout', () => () => (<div>Nav Toggler Menu Logout</div>));

describe('client/components/page/nav-bar/nav-toggler-menu', () => {
  const getComponent = () => (
    <Router>
      <NavTogglerMenu />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange/Act
    const { getByText, getAllByText } = render(getComponent());

    // Assert
    getByText(/Nav Toggler Menu Logout/);
    const tabs = getAllByText(/Nav Toggler Menu Item/);
    expect(tabs.length).toBe(2);
  });
});
