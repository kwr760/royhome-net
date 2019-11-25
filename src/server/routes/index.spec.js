import routes from './index';

describe('server/routes/index', () => {
  it('should contain the routes', () => {
    // Arrange/Act/Assert
    expect(routes.length).toEqual(5);
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/admin' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/private' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/resume' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/courses' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'put', path: '/log' }));
  });
});
