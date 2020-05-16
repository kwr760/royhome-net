import axios from 'axios';
import { apiActionCreator } from './api.action';
import { API_STATUS } from './api.contants';
import { ERROR_CODE } from '../../../util/error-codes';

jest.mock('axios');

describe('client/store/api/api.action', () => {
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call a successful dispatch', async () => {
    // Arrange
    const config = {
      method: 'get',
      url: '/url/{some}',
      headers: {
        head: 'er',
      },
      authenticated: true,
    };
    const action = {
      type: 'TEST',
      urlParams: {
        some: 'thing',
      },
      params: {
        param: 'test',
      },
      data: {
        body: 'fields',
      },
      payload: {
        pay: 'load',
      },
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
      ...action,
      status: API_STATUS.REQUEST,
    };
    const expectedSuccessDispatch = {
      ...action,
      status: API_STATUS.SUCCESS,
      response: responseData,
    };
    const expectedAxios = {
      data: {
        body: 'fields',
      },
      headers: {
        Authorization: 'Bearer token',
        head: 'er',
      },
      method: 'get',
      params: { param: 'test' },
      url: 'https://royk.us/api/url/thing',
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
    const config = {
      method: 'get',
      url: '/url',
    };
    const action = {
      type: 'TEST',
    };
    const errorResponse = {
      fail: 'why',
    };
    axios.mockRejectedValue(errorResponse);
    const expectedRequestDispatch = {
      ...action,
      status: API_STATUS.REQUEST,
    };
    const expectedSuccessDispatch = {
      ...action,
      status: API_STATUS.FAILURE,
      error: errorResponse,
    };
    const expectedAxios = {
      method: 'get',
      url: 'https://royk.us/api/url',
      data: {},
      headers: {},
      params: {},
    };

    // Act
    const result = await apiActionCreator(dispatch, config, action);

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, expectedRequestDispatch);
    expect(axios).toBeCalledWith(expectedAxios);
    expect(result).toBeUndefined();
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedSuccessDispatch);
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
