import { ChunkExtractor } from '@loadable/server';
import renderReact from './render-react';

jest.mock('@loadable/server');

describe('server/rendering/render-react', () => {
  it('should return a html page', () => {
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

    // Act
    renderReact(req, res);

    // Assert
    expect(res.send).toHaveBeenCalledWith(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Roy Home</title>
  <base href="/" >
  <link rel="shortcut icon" href="/dist/web/favicon.ico">
  <div>Links</div>
  <div>Styles</div>
  <script>window.__INITIAL_DATA__ = {"jwt":{"expiresAt":null,"data":undefined},"data":{}}</script>
</head>
<body>
  <div id="main">&lt;div&gt;Chunks&lt;/div&gt;</div>
  <div>Scripts</div>
</body>
</html>
`);
  });
});
