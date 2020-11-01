import { matchPath } from 'react-router-dom';

import { getResumeProxy } from '../proxy/resume.proxy';
import { fetchRoutes } from './fetch-routes';

jest.mock('../proxy/resume.proxy');

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
    (getResumeProxy as jest.Mock).mockResolvedValueOnce(resume);
    const expectedResult = {
      resume: {
        email: email,
        resumes: {
          [email]: resume,
        },
      },
    };

    // Act
    const activeRoute = fetchRoutes.find((route) => matchPath(url, route));
    const data = (activeRoute && activeRoute.fetchData) ? await activeRoute.fetchData() : {};

    // Assert
    expect(data).toEqual(expectedResult);
  });
});
