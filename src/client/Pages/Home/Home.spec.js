import React from 'react';
import { render } from '@testing-library/react';

import Home from './Home';
import initFontAwesome from '../../util/init-font-awesome';

initFontAwesome();

describe('client/Components/Pages/Public/Home', () => {
  xit('should render', () => {
    // Arrange/Act
    const { getByText } = render(
      <Home />,
    );

    // Assert
    getByText('This is the home page of Kevin Roy');
  });
});
