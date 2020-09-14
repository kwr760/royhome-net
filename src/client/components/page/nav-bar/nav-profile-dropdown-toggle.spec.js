import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { UncontrolledDropdown } from 'reactstrap';
import initFontAwesome from '../../../util/init-font-awesome';
import NavProfileDropDownToggle from './nav-profile-dropdown-toggle';
import configureStore from '../../../store/configure-store';

initFontAwesome();

describe('client/components/page/nav-bar/nav-profile-dropdown-toggle', () => {
  const getComponent = (store, name) => (
    <Provider store={store}>
      <UncontrolledDropdown>
        <NavProfileDropDownToggle name={name} />
      </UncontrolledDropdown>
    </Provider>
  );
  it('should render toggle', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        picture: 'picture',
      },
    };
    const store = configureStore(state);

    // Act
    const { getByAltText } = render(getComponent(store, 'Tester'));

    // Assert
    getByAltText(/Tester/);
  });
  it('should render toggle without pic', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
      },
    };
    const store = configureStore(state);

    // Act
    const { getByAltText } = render(getComponent(store, 'Tester'));

    // Assert
    getByAltText(/Tester/);
  });
});
