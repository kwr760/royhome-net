import { resumeReducer } from './resume.reducer';
import { ResumeActions } from './resume.constants';
import { ApiStatuses } from '../api/api.contants';

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
    education: {
      degree: 'degree',
      school: 'school',
      graduationDate: '2000-01',
    },
  };

  it('should update the state with resume with SUCCESS', () => {
    // Arrange
    const action = {
      type: ResumeActions.GET_RESUME,
      status: ApiStatuses.SUCCESS,
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
      type: ResumeActions.GET_RESUME,
      status: ApiStatuses.REQUEST,
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
      type: ResumeActions.GET_RESUME,
      status: ApiStatuses.FAILURE,
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
      type: ResumeActions.GET_RESUME,
      status: ApiStatuses.SUCCESS,
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
