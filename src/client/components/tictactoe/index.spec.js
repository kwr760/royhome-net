import React from 'react';
import { render } from '@testing-library/react';

import Index from './index';

describe('client/components/tictactoe', () => {
  it('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Index />,
    );

    // Assert
    getByText(/Tic-Tac-Toe/);
  });
});
