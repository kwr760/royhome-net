import generate from './generate';
import getResumeHandler from './resume/get';
import getPrivateHandler from './private/get';
import getAdminHandler from './admin/get';

const mockRouter = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
};

jest.mock('express', () => ({
  Router: jest.fn(() => mockRouter),
}));

describe('server/routes/generate', () => {
  beforeEach(() => {
    global.console.error = jest.fn();
  });
  afterEach(() => {
    global.console.error.mockRestore();
  });

  it('should generate routes', () => {
    // Arrange
    const routes = [
      {
        method: 'get',
        path: '/admin',
        handler: getAdminHandler,
        authenticate: true,
        role: 'admin',
      },
      {
        method: 'post',
        path: '/resume',
        handler: getResumeHandler,
      },
      {
        method: 'put',
        path: '/private',
        handler: getPrivateHandler,
      },
      {
        method: 'bad',
      },
    ];

    // Act
    const generatedRoutes = generate(routes);

    // Assert
    expect(generatedRoutes.get).toHaveBeenCalledWith('/admin', [expect.any(Function), expect.any(Function)], getAdminHandler);
    expect(generatedRoutes.post).toHaveBeenCalledWith('/resume', [], getResumeHandler);
    expect(generatedRoutes.put).toHaveBeenCalledWith('/private', [], getPrivateHandler);
    expect(console.error).toHaveBeenCalledWith('Unknown route: {"method":"bad"}');
  });
});
