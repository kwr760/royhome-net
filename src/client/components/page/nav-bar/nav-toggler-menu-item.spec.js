import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavTogglerMenuItem from './nav-toggler-menu-item';

jest.mock('@fortawesome/react-fontawesome');

describe('client/components/page/nav-bar/nav-toggler-menu-item', () => {
  const getComponent = (path, name, icon) => (
    <Router>
      <NavTogglerMenuItem path={path} name={name} icon={icon} />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);

    // Act
    const { getByText, getByRole } = render(getComponent('/path', 'Name', 'icon-test'));

    // Assert
    getByText(/Name/);
    getByRole('listitem');
    const link = getByRole('link');
    expect(link.pathname).toBe('/path');
    getByText(/Icon: icon-test/);
  });
});
