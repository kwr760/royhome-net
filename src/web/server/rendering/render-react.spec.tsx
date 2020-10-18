import { ChunkExtractor } from '@loadable/server';
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
    ChunkExtractor.mockImplementation(() => ({
      requireEntrypoint: jest.fn(() => ({ default: jest.fn() })),
      collectChunks: jest.fn(() => '<div>Chunks</div>'),
      getLinkTags: jest.fn(() => '<div>Links</div>'),
      getStyleTags: jest.fn(() => '<div>Styles</div>'),
      getScriptTags: jest.fn(() => '<div>Scripts</div>'),
    }));
    (getResumeProxy as jest.Mock).mockResolvedValue(resume);

    // Act
    await renderReact(req, res);

    // Assert
    expect(res.send).toMatchSnapshot();
  });
});
