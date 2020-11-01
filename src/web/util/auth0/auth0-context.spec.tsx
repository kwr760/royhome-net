import React from 'react';
import { render } from '@testing-library/react';
import { Auth0ContextType } from '../../types/auth0.types';
import { noop } from '../noop';

import { Auth0Context, useAuth0 } from './auth0-context';

const Test = () => {
  const { login } = useAuth0();
  return (
    <div>
      { `TestValue: ${login}` }
    </div>
  );
};

describe('util/auth0/context', () => {
  const getTest = (auth: Auth0ContextType) => (
    <Auth0Context.Provider value={auth}>
      <Test />
    </Auth0Context.Provider>
  );

  it('should produce a context', () => {
    // Arrange
    const auth: Auth0ContextType = {
      login: () => 'login',
      logout: noop,
      getToken: noop,
    };
    // Act
    const { getByText } = render(getTest(auth));

    // Assert
    getByText(/TestValue:/);
    getByText(/login/);
  });
});
