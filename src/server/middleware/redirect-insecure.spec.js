import redirectInsecure from './redirect-insecure';

describe('server/middleware/redirect-insecure', () => {
  it('should redirect if req is not secure', () => {
    // Arrange
    const req = {
      secure: false,
      headers: {
        host: 'localhost',
      },
      url: '/url',
    };
    const res = {
      redirect: jest.fn(),
      end: jest.fn(),
    };
    const next = jest.fn();

    // Ar
    redirectInsecure(req, res, next);

    // Assert
    expect(res.redirect).toHaveBeenCalledWith('https://localhost/url');
    expect(res.end).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  it('should not if req is secure', () => {
    // Arrange
    const req = {
      secure: true,
      headers: {
        host: 'localhost',
      },
      url: '/url',
    };
    const res = {
      redirect: jest.fn(),
      end: jest.fn(),
    };
    const next = jest.fn();

    // Ar
    redirectInsecure(req, res, next);

    // Assert
    expect(res.redirect).not.toHaveBeenCalled();
    expect(res.end).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
