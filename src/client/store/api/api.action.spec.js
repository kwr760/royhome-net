import axios from 'axios';

import { ERROR_CODE } from '@src/util/error-codes';
import { apiActionCreator } from './api.action';
import { ApiStatuses } from './api.contants';

jest.mock('axios');

describe('client/store/api/api.action', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call a successful dispatch', async () => {
    // Arrange
    const type = 'TEST';
    const payload = {
      pay: 'load',
    };
    const config = {
      method: 'get',
      url: '/url/{some}',
      headers: {
        head: 'er',
      },
      authenticated: true,
    };
    const action = {
      type,
      params: {
        some: 'thing',
      },
      data: {
        body: 'fields',
      },
      payload,
      token: 'token',
    };
    const responseData = {
      field: 'result',
    };
    const axiosResponse = {
      data: responseData,
    };
    axios.mockResolvedValue(axiosResponse);
    const expectedRequestDispatch = {
      type,
      payload,
      status: ApiStatuses.REQUEST,
    };
    const expectedSuccessDispatch = {
      type,
      payload,
      status: ApiStatuses.SUCCESS,
      data: responseData,
    };
    const expectedAxios = {
      data: payload,
      headers: {
        Authorization: 'Bearer token',
        head: 'er',
      },
      method: 'get',
      url: expect.stringMatching(/api\/url\/thing/),
    };

    // Act
    const result = await apiActionCreator(dispatch, config, action);

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestDispatch);
    expect(axios).toBeCalledWith(expectedAxios);
    expect(result).toBeUndefined();
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedSuccessDispatch);
  });
  it('should fail with failure dispatch', async () => {
    // Arrange
    const type = 'TEST';
    const config = {
      method: 'get',
      url: '/url',
    };
    const action = {
      type,
    };
    const errorResponse = {
      message: 'failed why',
    };
    axios.mockRejectedValue(errorResponse);
    const expectedRequestDispatch = {
      type,
      payload: {},
      status: ApiStatuses.REQUEST,
    };
    const expectedFailureDispatch = {
      type,
      payload: {},
      status: ApiStatuses.FAILURE,
      error: errorResponse.message,
    };
    const expectedAxios = {
      method: 'get',
      url: expect.stringMatching(/api\/url/),
      data: {},
      headers: {},
    };

    // Act
    const result = await apiActionCreator(dispatch, config, action);

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestDispatch);
    expect(axios).toBeCalledWith(expectedAxios);
    expect(result).toBeUndefined();
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedFailureDispatch);
  });
  it('should call a successful dispatch', async () => {
    // Arrange
    const config = {
      method: 'get',
      url: '/url',
      authenticated: true,
    };
    const action = {
      type: 'TEST',
    };

    // Act
    try {
      await apiActionCreator(dispatch, config, action);
    } catch (e) {
      expect(e).toEqual(ERROR_CODE.API_UNAUTHENTICATED);
    }

    // Assert
    expect(dispatch).not.toBeCalled();
    expect(axios).not.toBeCalled();
  });
});
