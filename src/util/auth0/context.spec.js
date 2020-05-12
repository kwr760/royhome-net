import React from 'react';
import { render } from '@testing-library/react';

import { Auth0Context, useAuth0 } from './context';

const Test = () => {
  const { testValue } = useAuth0();
  return (
    <div>
      { `TestValue: ${testValue}` }
    </div>
  );
};

describe('util/auth0/context', () => {
  const getTest = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Test />
    </Auth0Context.Provider>
  );

  xit('should produce a context', () => {
    // Arrange
    const auth = {
      testValue: 'test me',
    };
    // Act
    const { getByText } = render(getTest(auth));

    // Assert
    getByText(/TestValue:\s*test me/);
  });
});
