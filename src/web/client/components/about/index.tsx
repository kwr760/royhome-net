import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import projectMarkdown from '../../../../../PROJECT.md';

const About: FunctionComponent = () => (
  <ReactMarkdown
    source={projectMarkdown}
  />
);

export default About;
