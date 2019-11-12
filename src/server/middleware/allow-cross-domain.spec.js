import allowCrossDomain from './allow-cross-domain';

describe('server/middleware/allow-cross-domain', () => {
  it('should modify res and call next', () => {
    // Arrange
    const req = {};
    const res = {
      header: jest.fn(),
    };
    const next = jest.fn();

    // Act
    allowCrossDomain(req, res, next);

    // Assert
    expect(res.header).toBeCalledWith('Access-Control-Allow-Origin', '*');
    expect(res.header).toBeCalledWith('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    expect(next).toBeCalled();
  });
});
