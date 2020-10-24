import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import privacyMarkdown from '../../../../../PRIVACY.md';

const Privacy: FunctionComponent = () => (
  <ReactMarkdown
    source={privacyMarkdown}
  />
);

export default Privacy;
