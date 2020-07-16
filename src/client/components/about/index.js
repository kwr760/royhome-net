// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

// $FlowFixMe
import projectMarkdown from '@src/../PROJECT.md';

const About = () => (
  <ReactMarkdown
    source={projectMarkdown}
  />
);

export default About;
