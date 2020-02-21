/* eslint-disable global-require */
import React from 'react';
import reactDOM, { render, unmountComponentAtNode } from 'react-dom';

import MockProvider from '../util/auth0/react-auth0-spa';

jest.mock('../util/auth0/react-auth0-spa');
jest.mock('@loadable/component', () => ({
  loadableReady: (done) => (done()),
}));
jest.mock('./App', () => () => (<div>App</div>));

describe('src/client/index-web', () => {
  const ProviderCallback = (appState) => ({ children, onRedirectCallback }) => {
    onRedirectCallback(appState);
    return children;
  };
  let mainContainer = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main');
    document.body.appendChild(mainContainer);
  });
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(mainContainer);
    mainContainer.remove();
    mainContainer = null;
  });

  it('launches the App with targetUrl', () => {
    jest.isolateModules(() => {
      // Arrange
      const appState = {
        targetUrl: '/',
      };
      MockProvider.mockImplementation(ProviderCallback(appState));
      jest.spyOn(reactDOM, 'hydrate').mockImplementation((element, container) => render(element, container));

      // Act
      require('./index-web');

      // Assert
      expect(MockProvider).toBeCalled();
    });
  });
  it('launches the App with empty appState', () => {
    jest.isolateModules(() => {
      // Arrange
      const appState = {};
      MockProvider.mockImplementation(ProviderCallback(appState));
      jest.spyOn(reactDOM, 'hydrate').mockImplementation((element, container) => render(element, container));

      // Act
      require('./index-web');

      // Assert
      expect(MockProvider).toBeCalled();
    });
  });
});
