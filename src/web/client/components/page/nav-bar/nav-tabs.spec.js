import React from 'react';
import { render } from '@testing-library/react';

import NavTabs from './nav-tabs';

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
