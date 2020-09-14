import React from 'react';
import { render } from '@testing-library/react';

import initFontAwesome from '../../../util/init-font-awesome';
import NavTabs from './nav-tabs';

initFontAwesome();

jest.mock('./nav-tab-item', () => () => (<div>Nav Tab Item</div>));

describe('client/components/page/nav-bar/nav-tabs', () => {
  const getComponent = () => (
    <NavTabs />
  );
  it('should render the dropdown', () => {
    // Arrange / Act
    const { getAllByText } = render(getComponent());

    // Assert
    const tabs = getAllByText(/Nav Tab Item/);
    expect(tabs.length).toBe(4);
  });
});
