// @flow

import React from 'react';
import ReactMarkdown from 'react-markdown';

// $FlowFixMe
import privacyMarkdown from '@src/../PRIVACY.md';

const Privacy = () => (
  <ReactMarkdown
    source={privacyMarkdown}
  />
);

export default Privacy;
