import { resumeReducer } from './resume.reducer';
import { RESUME_ACTION } from './resume.constants';
import { API_STATUS } from '../api/api.contants';

describe('client/store/reducers/resume/resume.reducer', () => {
  const state = {};
  const resume = {
    owner: {
      id: 1,
      userId: 1,
      name: 'Test Name',
    },
    contact: {
      id: 1,
      userId: 1,
      phone: '(111) 222-3333',
      email: 'email@company.com',
      displayPhone: false,
    },
    address: {
      id: 1,
      userId: 1,
      address: 'Town, ST 99999',
    },
  };

  it('should update the state with resume with SUCCESS', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.SUCCESS,
      payload: {
        resume,
      },
    };
    const expectedState = {
      ...resume,
    };

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual({});
  });
  it('should not change state with REQUEST', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.REQUEST,
    };
    const expectedState = {};

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should not change state with FAILURE', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.FAILURE,
    };
    const expectedState = {};

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
