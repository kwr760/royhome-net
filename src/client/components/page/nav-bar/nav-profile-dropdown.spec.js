import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import initFontAwesome from '../../../util/init-font-awesome';
import NavProfileDropDown from './nav-profile-dropdown';
import configureStore from '../../../store/configure-store';

initFontAwesome();

jest.mock('./nav-profile-dropdown-toggle', () => () => (<div>Nav Profile Dropdown Toggle</div>));
jest.mock('./nav-profile-dropdown-item', () => () => (<div>Nav Profile Dropdown Item</div>));
jest.mock('./nav-profile-dropdown-logout', () => () => (<div>Nav Profile Dropdown Log Out</div>));

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

    // Act
    const { getByText, getAllByText } = render(getComponent(store));

    // Assert
    getByText(/Tester/);
    getByText(/Nav Profile Dropdown Toggle/);
    getAllByText(/Nav Profile Dropdown Item/);
    getByText(/Nav Profile Dropdown Log Out/);
  });
  it('should render the dropdown wihtout user name', () => {
    // Arrange
    const state = {};
    const store = configureStore(state);

    // Act
    const { getByText, getAllByText } = render(getComponent(store));

    // Assert
    getByText(/Nav Profile Dropdown Toggle/);
    getAllByText(/Nav Profile Dropdown Item/);
    getByText(/Nav Profile Dropdown Log Out/);
  });
});
