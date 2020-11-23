/* eslint-disable global-require */
import { removeJssStyle } from './remove-jss-style';

describe('src/client/util/remove-jss-style', () => {
  it('removeJssStyle should call removeChild', () => {
    jest.isolateModules(() => {
      // Arrange
      const mockRemoveChild = jest.fn();
      const element = {
        parentNode: {
          removeChild: mockRemoveChild,
        },
      } as unknown as Element;

      // Act
      removeJssStyle(element);

      // Assert
      expect(mockRemoveChild).toBeCalled();
    });
  });
  it('removeJssStyle should call removeChild - no parentNode', () => {
    jest.isolateModules(() => {
      // Arrange
      const mockRemoveChild = jest.fn();
      const element = {
      } as unknown as Element;

      // Act
      removeJssStyle(element);

      // Assert
      expect(mockRemoveChild).not.toBeCalled();
    });
  });
  it('removeJssStyle should call removeChild - null', () => {
    jest.isolateModules(() => {
      // Arrange
      const mockRemoveChild = jest.fn();
      const element = null;

      // Act
      removeJssStyle(element);

      // Assert
      expect(mockRemoveChild).not.toBeCalled();
    });
  });
});
