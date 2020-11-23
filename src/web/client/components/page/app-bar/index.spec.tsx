import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { render } from '@testing-library/react';
import themeLight from '../../../theme-light';

import DarkButton from '../dark-button';
import NavBar from './index';
import { NavBarTabs } from './nav-bar-tabs';
import { NavBarMenu } from './nav-bar-menu';
import { NavBarMenuButton } from './nav-bar-menu-button';

jest.mock('./nav-bar-tabs');
jest.mock('./nav-bar-menu');
jest.mock('./nav-bar-menu-button');
jest.mock('../dark-button');
jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
}));

describe('src/client/components/page/app-bar/index', () => {
  it('renders app-bar', () => {
    // Arrange
    (NavBarTabs as jest.Mock).mockImplementation(() => <div>NavBar Tabs</div>);
    (NavBarMenu as jest.Mock).mockImplementation(() => <div>NavBarMenu</div>);
    (NavBarMenuButton as jest.Mock).mockImplementation(() => <div>NavBar Menu Button</div>);
    (DarkButton as jest.Mock).mockImplementation(() => <div>Dark Button</div>);

    // Act
    const { getByText } = render(
      <ThemeProvider theme={themeLight}>
        <NavBar />
      </ThemeProvider>,
    );

    // Assert
    getByText(/NavBar Tabs/);
    getByText(/NavBarMenu/);
    getByText(/NavBar Menu Button/);
    getByText(/Dark Button/);
  });
});
