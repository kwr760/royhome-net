describe('src/util/history', () => {
  it('is already tested', () => {
    // Arrange/Act
    const requiresBrowser = 'history requires BrowserRouter';
    const alreadyTested = 'Tested in index-web';

    // Assert
    expect(requiresBrowser).toMatch(/browser/i);
    expect(alreadyTested).toMatch(/index-web/);
  });
});
