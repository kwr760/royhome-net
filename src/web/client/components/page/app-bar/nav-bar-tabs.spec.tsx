import React, { Dispatch, SetStateAction } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mediaQuery from 'css-mediaquery';

import { NavBarTabs } from './nav-bar-tabs';

function createMatchMedia(width: number) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
  }) as unknown as MediaQueryList;
}

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}

describe('src/client/components/page/app-bar/nav-bar-tabs', () => {
  const mockStore = configureMockStore([thunk]);
  const getComponent = (store: Store, position: number, setPosition: Dispatch<SetStateAction<number>>) => (
    <Provider store={store}>
      <Router>
        <NavBarTabs position={position} setPosition={setPosition} />
      </Router>
    </Provider>
  );
  it('renders app-bar-tabs in brower', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        context: {
          role: 'engineer',
        },
      },
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(1024) as (q: string) => MediaQueryList;

    const position = 0;
    const setPosition = jest.fn() as Dispatch<SetStateAction<number>>;

    // Act
    const { getByText, getAllByRole } = render(getComponent(store, position, setPosition));
    const tabs = getAllByRole('tab');
    fireEvent.click(tabs[0]);

    // Assert
    getByText(/Resume/);
    getByText(/About/);
    getByText(/Author/);
    expect(setPosition).toBeCalled();
  });
  it('does not render app-bar-tabs in mobile', () => {
    // Arrange
    const state = {
      user: {
        name: 'Tester',
        context: {
          role: 'engineer',
        },
      },
      session: {
        authenticated: true,
      },
    };
    const store = mockStore(state);
    window.matchMedia = createMatchMedia(400) as (q: string) => MediaQueryList;

    const position = 0;
    const setPosition = jest.fn() as Dispatch<SetStateAction<number>>;

    // Act
    const { queryByText } = render(getComponent(store, position, setPosition));

    // Assert
    // getByText(/Resume/);
    expect(queryByText(/Resume/)).toBeNull();
  });
});
