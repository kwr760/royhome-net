// @flow

import React from 'react';

// flowlint-next-line untyped-import:off
import ResumeHtml from './Resume.html';
import './Resume.scss';

const Resume = () => {
  const template = { __html: ResumeHtml };

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={template} />
  );
};

export default Resume;
