import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import NavProfileDropDown from './nav-profile-dropdown';
import configureStore from '../../../store/configure-store';
import NavProfileDropDownItem from './nav-profile-dropdown-item';
import NavProfileDropDownLogout from './nav-profile-dropdown-logout';
import NavProfileDropDownToggle from './nav-profile-dropdown-toggle';

jest.mock('./nav-profile-dropdown-toggle');
jest.mock('./nav-profile-dropdown-item');
jest.mock('./nav-profile-dropdown-logout');

describe('client/components/page/nav-bar/nav-profile-dropdown', () => {
  const getComponent = (store) => (
    <Provider store={store}>
      <NavProfileDropDown />
    </Provider>
  );
  it('should render the dropdown', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        picture: 'pic',
      },
    };
    const store = configureStore(state);
    (NavProfileDropDownToggle as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Toggle</div>);
    (NavProfileDropDownItem as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Item</div>);
    (NavProfileDropDownLogout as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Logout</div>);

    // Act
    const { getByText, getAllByText } = render(getComponent(store));

    // Assert
    getByText(/Tester/);
    getByText(/Nav Profile Dropdown Toggle/);
    getAllByText(/Nav Profile Dropdown Item/);
    getByText(/Nav Profile Dropdown Logout/);
  });
  it('should render the dropdown wihtout user name', () => {
    // Arrange
    const state = {};
    const store = configureStore(state);
    (NavProfileDropDownToggle as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Toggle</div>);
    (NavProfileDropDownItem as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Item</div>);
    (NavProfileDropDownLogout as jest.Mock).mockImplementation(() => <div>Nav Profile Dropdown Logout</div>);

    // Act
    const { getByText, getAllByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Profile Dropdown Toggle/);
    getAllByText(/Nav Profile Dropdown Item/);
    getByText(/Nav Profile Dropdown Logout/);
  });
});
