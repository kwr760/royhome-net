import React from 'react';
import { render } from '@testing-library/react';

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
  const getTest = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Test />
    </Auth0Context.Provider>
  );

  it('should produce a context', () => {
    // Arrange
    const auth = {
      testValue: 'test me',
    };
    // Act
    const { getByText } = render(getTest(auth));

    // Assert
    getByText(/TestValue:\sundefined/);
  });
});