import axios from 'axios';
import { ApiConfigType } from '../../../types/api.types';

import { ERROR_CODE } from '../../../util/error-codes';
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
    const config: ApiConfigType = {
      method: 'get',
      url: '/url/{some}',
      headers: {
        Authorization: 'er',
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
    (axios as unknown as jest.Mock).mockResolvedValue(axiosResponse);
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
      },
      method: 'get',
      url: expect.stringMatching(/api.localhost\/url\/thing/),
    };

    // Act
    const result = await apiActionCreator(dispatch, config, action);

    // Assert
    expect(axios).toBeCalledWith(expectedAxios);
    expect(result).toBeUndefined();
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestDispatch);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedSuccessDispatch);
  });
  it('should fail with failure dispatch', async () => {
    // Arrange
    const type = 'TEST';
    const config: ApiConfigType = {
      method: 'get',
      url: '/url',
    };
    const action = {
      type,
      payload: 'payload',
    };
    const errorResponse = {
      message: 'failed why',
    };
    (axios as unknown as jest.Mock).mockRejectedValue(errorResponse);
    const expectedRequestDispatch = {
      type,
      payload: 'payload',
      status: ApiStatuses.REQUEST,
    };
    const expectedFailureDispatch = {
      type,
      payload: 'payload',
      status: ApiStatuses.FAILURE,
      error: errorResponse.message,
    };
    const expectedAxios = {
      method: 'get',
      url: expect.stringMatching(/api.localhost\/url/),
      data: 'payload',
      headers: {},
    };

    // Act
    const result = await apiActionCreator(dispatch, config, action);
    await(() => {});

    // Assert
    expect(axios).toBeCalledWith(expectedAxios);
    expect(result).toBeUndefined();
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestDispatch);
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedFailureDispatch);
  });
  it('should call a successful dispatch', async () => {
    // Arrange
    const config: ApiConfigType = {
      method: 'get',
      url: '/url',
      authenticated: true,
    };
    const action = {
      type: 'TEST',
      payload: 'payload',
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
