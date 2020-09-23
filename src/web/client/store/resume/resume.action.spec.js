import { getResumeAction } from './resume.action';
import { apiActionCreator } from '../api/api.action';
import { ApiConfigs } from '../api/api.contants';
import { ResumeActions } from './resume.constants';

jest.mock('../api/api.action');

describe('client/store/resume/resume.action', () => {
  it('should create an api action', () => {
    // Arrange
    const dispatch = jest.fn();
    const email = 'email@company.com';
    const token = 'token';
    const expectedConfig = ApiConfigs.GET_RESUME;
    const expectedAction = {
      type: ResumeActions.GET_RESUME,
      params: {
        email,
      },
      payload: {
        email,
      },
      token,
    };

    // Act
    getResumeAction(dispatch, email, token);

    // Assert
    expect(apiActionCreator).toHaveBeenCalledWith(dispatch, expectedConfig, expectedAction);
  });
});
