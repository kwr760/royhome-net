import routes from './index';

describe('server/routes/index', () => {
  it('should contain the routes', () => {
    // Arrange/Act/Assert
    expect(routes.length).toEqual(3);
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/staticresume' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'get', path: '/resume' }));
    expect(routes).toContainEqual(expect.objectContaining({ method: 'put', path: '/log' }));
  });
});
