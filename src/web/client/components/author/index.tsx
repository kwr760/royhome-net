import React from 'react';
import ReactMarkdown from 'react-markdown';

import authorMarkdown from '../../../../../AUTHOR.md';

const Author = (): JSX.Element => (
  <ReactMarkdown
    source={authorMarkdown}
  />
);

export default Author;
