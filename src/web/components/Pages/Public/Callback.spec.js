import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Callback from './Callback';

describe('web/components/Pages/Public/Callback', () => {
  it('should throw exception with bad url hash', () => {
    // Arrange
    const auth = {
      handleAuthentication: jest.fn(),
    };
    const location = {
      hash: 'http://url/kevin',
    };
    global.console.error = jest.fn().mockImplementation(() => {});

    // Act/Assert
    try {
      render(<Callback auth={auth} location={location} />);
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toMatch('Invalid callback URL.');
    }

    // Rearrange
    global.console.error.mockRestore();
  });
  it('should call handleAuthentication on good url hash', () => {
    // Arrange
    const auth = {
      handleAuthentication: jest.fn(),
    };
    const location = {
      hash: 'http://url/access_token',
    };

    // Act/Assert
    const { getByText } = render(<Callback auth={auth} location={location} />);

    getByText('Loading...');
    expect(auth.handleAuthentication).toBeCalled();
  });
});
