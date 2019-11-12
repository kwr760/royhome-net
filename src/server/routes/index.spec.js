import routes from './index';

describe('server/routes/index', () => {
  it('should contain the routes', () => {
    // Arrange/Act/Assert
    expect(routes.length).toEqual(4);
    expect(routes).toContainEqual(expect.objectContaining({ path: '/admin' }));
    expect(routes).toContainEqual(expect.objectContaining({ path: '/private' }));
    expect(routes).toContainEqual(expect.objectContaining({ path: '/resume' }));
    expect(routes).toContainEqual(expect.objectContaining({ path: '/courses' }));
  });
});
