// @flow

import React from 'react';

// flowlint-next-line untyped-import:off
import ResumeHtml from './resume.html';
import './resume.scss';

const HtmlResume = () => {
  const template = { __html: ResumeHtml };

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={template} />
  );
};

export default HtmlResume;
