import { OK } from 'http-status-codes';
import getResumeHandler from './get-resume';
import { loadResumeByEmail } from '../../db/resume';

jest.mock('../../db/resume');

describe('server/routes/resume/get', () => {
  it('should return default response', async () => {
    // Arrange
    const req = {};
    const res = {};
    loadResumeByEmail.mockReturnValue('resume');
    const expected = {
      status: OK,
      body: {
        resume: 'resume',
      },
    };

    // Act
    const response = await getResumeHandler(req, res);

    // Assert
    expect(response).toEqual(expected);
  });
});
