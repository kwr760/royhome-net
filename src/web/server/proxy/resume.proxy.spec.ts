import axios from 'axios';

import { getResumeProxy } from './resume.proxy';

jest.mock('axios');

describe('web/server/proxy/resume.proxy', () => {
  it('should get resume', async () => {
    // Arrange
    const email = 'kroy760@gmail.com';
    const expected = { resume: 'resume' };
    (axios.get as jest.Mock).mockResolvedValue({ data: { resume: expected } });

    // Act
    const resume = await getResumeProxy(email);

    // Assert
    expect(axios.get).toBeCalledWith('https://api.royk.us/resume/kroy760%40gmail.com');
    expect(resume).toEqual(expected);
  });
});
