import { fireEvent, render } from '@testing-library/react';
import React, { Dispatch, SetStateAction } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { NavBarMenuButton } from './nav-bar-menu-button';

describe('src/client/components/page/app-bar/nav-bar-menu-button', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store, setAnchor: Dispatch<SetStateAction<HTMLElement | null>>) => (
    <Provider store={store}>
      <Router>
        <NavBarMenuButton setAnchor={setAnchor} />
      </Router>
    </Provider>
  );
  it('renders navbar menu button', () => {
    // Arrange
    const state = {
      user: {},
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);

    const setAnchor = jest.fn() as Dispatch<SetStateAction<HTMLElement | null>>;

    // Act
    const { getByRole } = render(getComponent(store, setAnchor));
    fireEvent.click(getByRole('button'));

    // Assert
    expect(setAnchor).toBeCalled();
  });
  it('renders navbar menu button', () => {
    // Arrange
    const state = {
      user: {
        picture: 'picture',
      },
      session: {
        authenticated: false,
      },
    };
    const store = mockStore(state);

    const setAnchor = jest.fn() as Dispatch<SetStateAction<HTMLElement | null>>;

    // Act
    const { getByRole } = render(getComponent(store, setAnchor));

    // Assert
    getByRole(/button/);
  });
});
