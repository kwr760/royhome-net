import React from 'react';

import ResumeHtml from './Resume.html';
import './Resume.scss';

const Resume = () => {
  const template = { __html: ResumeHtml };

  return (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={template} />
  );
};

Resume.propTypes = {
};

export default Resume;
