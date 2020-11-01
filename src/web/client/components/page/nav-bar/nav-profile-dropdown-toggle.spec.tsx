import React from 'react';
import { render } from '@testing-library/react';

import { Provider } from 'react-redux';
import { UncontrolledDropdown } from 'reactstrap';
import { Store } from 'redux';
import NavProfileDropDownToggle from './nav-profile-dropdown-toggle';
import createStore from '../../../store/create-store';

describe('client/components/page/nav-bar/nav-profile-dropdown-toggle', () => {
  const getComponent = (store: Store, name: string) => (
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
    const store = createStore(state);

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
    const store = createStore(state);

    // Act
    const { getByAltText } = render(getComponent(store, 'Tester'));

    // Assert
    getByAltText(/Tester/);
  });
});
