import React from 'react';
import { render } from '@testing-library/react';

import Loading from './index';

describe('src/client/components/page/loading', () => {
  it('renders without crashing', () => {
    // Arrange/Act
    const { getByAltText } = render(
      <Loading />,
    );

    // Assert
    getByAltText(/Loading/);
  });
});
