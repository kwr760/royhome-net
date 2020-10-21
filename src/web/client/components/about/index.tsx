import React from 'react';
import ReactMarkdown from 'react-markdown';

import projectMarkdown from '../../../../../PROJECT.md';

const About = (): JSX.Element => (
  <ReactMarkdown
    source={projectMarkdown}
  />
);

export default About;
