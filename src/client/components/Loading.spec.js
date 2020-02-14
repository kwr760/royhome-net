import React from 'react';
import { render } from '@testing-library/react';

import Loading from './Loading';

describe('src/client/components/Loading', () => {
  it('renders without crashing', () => {
    // Arrange/Act
    const { getByAltText } = render(
      <Loading />,
    );

    // Assert
    getByAltText(/Loading/);
  });
});
