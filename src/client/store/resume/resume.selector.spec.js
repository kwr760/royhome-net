import { useSelector } from 'react-redux';

import { getResume } from './resume.selector';

jest.mock('react-redux');

describe('client/store/resume/resume.selector', () => {
  it('should return resume', () => {
    // Arrange
    const email = 'kroy760@gmail.com';
    const expectedResume = {
      owner: {
        name: 'Kevin Roy',
      },
      contact: {
        phone: '(425) 555-1234',
        email: 'kroy@gmail.com',
        displayPhone: false,
      },
      address: {
        address: 'Town, ST 98028',
      },
      summary: {
        summary: 'summary',
      },
    };
    const mockState = {
      resume: {
        activeResume: email,
        [email]: expectedResume,
      },
    };
    useSelector.mockImplementation((callback) => callback(mockState));

    // Act
    const resume = useSelector((state) => getResume(state, null));

    // Assert
    expect(resume).toEqual(expectedResume);
  });
});
