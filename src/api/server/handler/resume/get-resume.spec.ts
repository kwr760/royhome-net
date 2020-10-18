import { OK } from 'http-status-codes';
import getResumeHandler from './get-resume';
import { loadResumeByEmail } from '../../db/resume';

jest.mock('../../db/resume');

describe('server/routes/resume/get', () => {
  it('should return default response', async () => {
    // Arrange
    (loadResumeByEmail as jest.Mock).mockReturnValue('resume');
    const expected = {
      status: OK,
      data: {
        resume: 'resume',
      },
    };

    // Act
    const response = await getResumeHandler();

    // Assert
    expect(response).toEqual(expected);
  });
});
