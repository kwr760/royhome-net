import React from 'react';

import ResumeHtml from './Resume.html';
import './Resume.css';

const Resume = () => {
  const template = { __html: ResumeHtml };

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={template} />
  );
};

export default Resume;
