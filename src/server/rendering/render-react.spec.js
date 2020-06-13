import { ChunkExtractor } from '@loadable/server';
import renderReact from './render-react';
import getResumeHandler from '../handler/resume/get-resume';

jest.mock('@loadable/server');
jest.mock('../handler/resume/get-resume');

describe('server/rendering/render-react', () => {
  const resume = {
    owner: 'owner',
  };
  const response = {
    body: { resume },
  };
  it('should return a html page', async () => {
    // Arrange
    const req = {
      cookies: {},
    };
    const res = {
      send: jest.fn(),
      sendStatus: jest.fn(),
    };
    ChunkExtractor.mockImplementation(() => ({
      requireEntrypoint: jest.fn(() => ({ default: jest.fn() })),
      collectChunks: jest.fn(() => '<div>Chunks</div>'),
      getLinkTags: jest.fn(() => '<div>Links</div>'),
      getStyleTags: jest.fn(() => '<div>Styles</div>'),
      getScriptTags: jest.fn(() => '<div>Scripts</div>'),
    }));
    getResumeHandler.mockResolvedValueOnce(response);

    // Act
    await renderReact(req, res);

    // Assert
    expect(res.send).toMatchSnapshot();
  });
});
