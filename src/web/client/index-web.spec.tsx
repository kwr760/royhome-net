/* eslint-disable global-require */
import React from 'react';
import reactDOM, { render, unmountComponentAtNode } from 'react-dom';

import App from './App';

jest.mock('@loadable/component');
jest.mock('./App');

describe('src/client/index-web', () => {
  const mockApp = jest.fn(() => <div>App</div>);
  let mainContainer: HTMLElement;
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
    // mainContainer = null;
  });

  it('launches the App with targetUrl', () => {
    jest.isolateModules(() => {
      // Arrange
      (App as jest.Mock).mockImplementation(mockApp);
      jest.spyOn(React, 'useEffect').mockImplementation(() => {});
      jest.spyOn(reactDOM, 'hydrate').mockImplementation(
        (element, container) => render(element, container),
      );

      // Act
      require('./index-web');

      // Assert
      expect(mockApp).toBeCalled();
    });
  });
  it('launches the App with empty root', () => {
    jest.isolateModules(() => {
      // Arrange
      jest.spyOn(document, 'getElementById').mockImplementation(() => null);

      // Act // Assert
      require('./index-web');
    });
  });
});
