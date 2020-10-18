import React from 'react';
import ReactMarkdown from 'react-markdown';

import privacyMarkdown from '../../../../../PRIVACY.md';

const Privacy = (): JSX.Element => (
  <ReactMarkdown
    source={privacyMarkdown}
  />
);

export default Privacy;
