import React from 'react';
import { useDispatch } from 'react-redux';

import { render, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Resume from './index';
import { Auth0Context } from '../../../util/auth0/auth0-context';
import { getResumeAction } from '../../store/resume/resume.action';

jest.mock('react-redux');
jest.mock('../../store/resume/resume.action');

describe('client/Components/Pages/Private/Resume', () => {
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

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render request', async () => {
    // Arrange
    useDispatch.mockReturnValue(dispatch);

    // Act
    const { getByText } = render(getResume(defaultAuth));

    // Assert
    await waitForElement(() => getByText(/Resume Header/));
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

    // Assert
    await waitForElement(() => getByText(/Resume Header/));
    getByText(/Resume Summary/);
    getByText(/Resume Skills/);
    getByText(/Resume Experience/);
    getByText(/Resume Education/);
    expect(getResumeAction).not.toBeCalled();
  });
});
