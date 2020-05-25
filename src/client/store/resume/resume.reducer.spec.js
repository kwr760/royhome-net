import { resumeReducer } from './resume.reducer';
import { RESUME_ACTION } from './resume.constants';
import { API_STATUS } from '../api/api.contants';

describe('client/store/reducers/resume/resume.reducer', () => {
  const state = {};
  const email = 'email@company.com';
  const resume = {
    owner: {
      name: 'Test Name',
    },
    contact: {
      phone: '(111) 222-3333',
      email: 'email@company.com',
      displayPhone: false,
    },
    address: {
      address: 'Town, ST 99999',
    },
    summary: {
      summary: 'summary',
    },
  };

  it('should update the state with resume with SUCCESS', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.SUCCESS,
      payload: {
        email,
      },
      data: {
        resume,
      },
    };
    const expectedState = {
      [email]: resume,
    };

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should not change state with REQUEST', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.REQUEST,
      payload: {
        email,
      },
    };
    const expectedState = {};

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should not change state with FAILURE', () => {
    // Arrange
    const error = 'Error message';
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.FAILURE,
      payload: {
        email,
      },
      error,
    };
    const expectedState = {
      error,
    };

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
  it('should update the state without data with SUCCESS', () => {
    // Arrange
    const action = {
      type: RESUME_ACTION.GET_RESUME,
      status: API_STATUS.SUCCESS,
      payload: {
        email,
      },
    };
    const expectedState = {
      [email]: {},
    };

    // Act
    const result = resumeReducer(state, action);

    // Assert
    expect(result).toEqual(expectedState);
  });
});
