import { getResumeAction } from './resume.action';
import { apiActionCreator } from '../api/api.action';
import { API_CONFIG } from '../api/api.contants';
import { RESUME_ACTION } from './resume.constants';

jest.mock('../api/api.action');

describe('client/store/resume/resume.action', () => {
  it('should create an api action', () => {
    // Arrange
    const dispatch = jest.fn();
    const email = 'email@company.com';
    const expectedConfig = API_CONFIG.GET_RESUME;
    const expectedAction = {
      type: RESUME_ACTION.GET_RESUME,
      urlParams: {
        email,
      },
    };

    // Act
    getResumeAction(dispatch, email);

    // Assert
    expect(apiActionCreator).toHaveBeenCalledWith(dispatch, expectedConfig, expectedAction);
  });
});
