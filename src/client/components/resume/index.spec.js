import React from 'react';
import { useDispatch } from 'react-redux';

import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Resume from './index';
import { Auth0Context } from '../../../util/auth0/auth0-context';
import { getResumeAction } from '../../store/resume/resume.action';
import ResumeHeader from './header';
import ResumeSummary from './summary';
import ResumeSkills from './skills';
import ResumeExperience from './experience';
import ResumeEducation from './education';

jest.mock('react-redux');
jest.mock('../../store/resume/resume.action');
jest.mock('./header');
jest.mock('./summary');
jest.mock('./skills');
jest.mock('./experience');
jest.mock('./education');

describe('client/components/private/resume', () => {
  const token = 'token';
  const email = 'kroy760@gmail.com';
  const dispatch = jest.fn();
  const defaultAuth = {
    getToken: jest.fn(() => token),
  };
  const getResume = (auth) => (
    <Auth0Context.Provider value={auth}>
      <Resume />
    </Auth0Context.Provider>
  );

  beforeEach(() => {
    ResumeHeader.mockReturnValue('Resume Header');
    ResumeSummary.mockReturnValue('Resume Summary');
    ResumeSkills.mockReturnValue('Resume Skills');
    ResumeExperience.mockReturnValue('Resume Experience');
    ResumeEducation.mockReturnValue('Resume Education');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render request', async () => {
    // Arrange
    useDispatch.mockReturnValue(dispatch);

    // Act
    const { getByText } = render(getResume(defaultAuth));
    await wait();

    // Assert
    getByText(/Resume Header/);
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
    expect(getResumeAction).toBeCalledWith(dispatch, email, token);
  });
  it('should render default request if there is no token', async () => {
    // Arrange
    const overrideAuth = {
      getToken: jest.fn(),
    };

    // Act
    const { getByText } = render(getResume(overrideAuth));
    await wait();

    // Assert
    getByText(/Resume Header/);
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
    expect(getResumeAction).not.toBeCalled();
  });
});
