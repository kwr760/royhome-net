/* eslint-disable global-require */
import React from 'react';
import reactDOM, { render, unmountComponentAtNode } from 'react-dom';

import MockProvider from '@src/util/auth0/auth0-spa';
import MockApp from './App';

jest.mock('@src/util/auth0/auth0-spa');
jest.mock('@loadable/component', () => ({
  loadableReady: (done) => (done()),
}));
jest.mock('./App');

describe('src/client/index-web', () => {
  const ProviderCallback = (appState) => ({ children, onRedirectCallback }) => {
    onRedirectCallback(appState);
    return children;
  };
  const mockApp = jest.fn(() => (<div>App</div>));
  let mainContainer = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    mainContainer = document.createElement('div');
    mainContainer.setAttribute('id', 'main');
    document.body.appendChild(mainContainer);
  });
  afterEach(() => {
    jest.clearAllMocks();
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
      MockApp.mockImplementation(mockApp);

      // Act
      require('./index-web');

      // Assert
      expect(MockProvider).toBeCalledTimes(1);
      expect(MockApp).toBeCalled();
      expect(mockApp).toBeCalled();
    });
  });
  it('launches the App with empty appState', () => {
    jest.isolateModules(() => {
      // Arrange
      const appState = {};
      MockProvider.mockImplementation(ProviderCallback(appState));
      jest.spyOn(reactDOM, 'hydrate').mockImplementation((element, container) => render(element, container));
      MockApp.mockImplementation(mockApp);

      // Act
      require('./index-web');

      // Assert
      expect(MockProvider).toBeCalledTimes(1);
      expect(MockApp).toBeCalled();
      expect(mockApp).toBeCalled();
    });
  });
  it('launches the App with empty root', () => {
    jest.isolateModules(() => {
      // Arrange
      jest.spyOn(document, 'getElementById').mockImplementation((element) => (null));

      // Act
      require('./index-web');

      // Assert
      expect(MockProvider).not.toBeCalled();
    });
  });
});
