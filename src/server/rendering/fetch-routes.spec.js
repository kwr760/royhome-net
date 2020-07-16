import { matchPath } from 'react-router-dom';

import { fetchRoutes } from './fetch-routes';
import { loadResumeByEmail } from '../db/resume';

jest.mock('../db/resume');

describe('server/rendering/fetch-routes', () => {
  const email = 'kroy760@gmail.com';
  const resume = {
    owner: 'owner',
  };
  it('should have known length', () => {
    // Arrange // Act // Assert
    expect(fetchRoutes.length).toEqual(1);
  });
  it('should return resume state', async () => {
    // Arrange
    const url = '/';
    loadResumeByEmail.mockResolvedValueOnce(resume);
    const expectedResult = {
      resume: {
        activeResume: email,
        [email]: resume,
      },
    };

    // Act
    const activeRoute = fetchRoutes.find((route) => matchPath(url, route)) || {};
    const data = activeRoute.fetchData ? await activeRoute.fetchData() : {};

    // Assert
    expect(data).toEqual(expectedResult);
  });
});