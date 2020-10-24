import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import authorMarkdown from '../../../../../AUTHOR.md';

const Author: FunctionComponent = () => (
  <ReactMarkdown
    source={authorMarkdown}
  />
);

export default Author;
