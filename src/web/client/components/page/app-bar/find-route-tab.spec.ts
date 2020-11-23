import { findRouteTab } from './find-route-tab';
import { pages } from './pages';

describe('web/client/components/page/app-bar/find-route-tab', () => {
  it('returns correct routes for tabs', () => {
    // Arrange // Act // Assert
    expect(findRouteTab('/')).toBe(0);
    expect(findRouteTab('/about')).toBe(1);
    expect(findRouteTab('/author')).toBe(2);
    expect(findRouteTab('/tictactoe')).toBe(3);
    expect(pages.length).toBe(4);
  });
});
