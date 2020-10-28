import { Request, Response } from 'express';
import { getResumeProxy } from '../proxy/resume.proxy';
import renderReact from './render-react';

jest.mock('@loadable/server');
jest.mock('../proxy/resume.proxy');

describe('server/rendering/render-react', () => {
  const resume = {
    owner: 'owner',
  };
  it('should return a html page', async () => {
    // Arrange
    const req = {
      url: '/',
      cookies: {},
    } as Request;
    const res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    } as unknown as Response;
    (getResumeProxy as jest.Mock).mockResolvedValue(resume);

    // Act
    await renderReact(req, res);

    // Assert
    expect(res.send).toMatchSnapshot();
  });
});
