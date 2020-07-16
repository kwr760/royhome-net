// @flow

import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useAuth0 } from '@src/util/auth0/auth0-context';
import Resume from './resume';
import { getResumeAction } from '../../store/resume/resume.action';
import { getResume } from '../../store/resume/resume.selector';
import { isLoading } from '../../store/session/session.selector';

const ResumePage = () => {
  const { getToken } = useAuth0();
  const resume = useSelector(getResume);
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  useEffect(() => {
    const callResumeApi = async () => {
      if (isEmpty(resume)) {
        const token = await getToken();
        if (token) {
          getResumeAction(dispatch, 'kroy760@gmail.com', token);
        }
      }
    };
    callResumeApi();
  }, [resume, dispatch, getToken]);

  return (
    loading ? null : <Resume resume={resume} />
  );
};

export default ResumePage;
