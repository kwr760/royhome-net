import React from 'react';
import { render } from '@testing-library/react';

import NavTabs from './nav-tabs';
import NavTabItem from './nav-tab-item';

jest.mock('./nav-tab-item');

describe('client/components/page/nav-bar/nav-tabs', () => {
  const getComponent = () => (
    <NavTabs />
  );
  it('should render the dropdown', () => {
    // Arrange / Act
    (NavTabItem as jest.Mock).mockImplementation(() => <div>Nav Tab Item</div>);
    const { getAllByText } = render(getComponent());

    // Assert
    const tabs = getAllByText(/Nav Tab Item/);
    expect(tabs.length).toBe(4);
  });
});
