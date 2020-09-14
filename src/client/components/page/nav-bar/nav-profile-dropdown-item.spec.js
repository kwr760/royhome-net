import React from 'react';
import { render } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavProfileDropDownItem from './nav-profile-dropdown-item';

jest.mock('@fortawesome/react-fontawesome');

describe('client/components/page/nav-bar/nav-profile-dropdown-item', () => {
  const getComponent = (path, name, icon) => (
    <Router>
      <NavProfileDropDownItem path={path} name={name} icon={icon} />
    </Router>
  );
  it('should render the dropdown', () => {
    // Arrange
    FontAwesomeIcon.mockImplementation(({ icon }) => `Icon: ${icon}`);

    // Act
    const { getByText, getByRole } = render(getComponent('/path', 'Name', 'icon-test'));

    // Assert
    getByText(/Name/);
    getByRole('menuitem');
    getByText(/Icon: icon-test/);
  });
});
