// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

// $FlowFixMe
import authorMarkdown from '@src/../AUTHOR.md';

const Author = () => (
  <ReactMarkdown
    source={authorMarkdown}
  />
);

export default Author;
