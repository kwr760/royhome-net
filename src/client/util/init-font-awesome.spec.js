import { library } from '@fortawesome/fontawesome-svg-core';

import initFontAwesome from './init-font-awesome';

jest.mock('@fortawesome/fontawesome-svg-core');

describe('client/util/init-font-awesome', () => {
  it('should load the library', () => {
    // Arrange
    const mockAdd = jest.fn();
    library.add = mockAdd;

    // Act
    initFontAwesome();

    // Assert
    expect(mockAdd).toBeCalledTimes(8);
  });
});
