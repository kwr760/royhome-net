// @flow

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth0 } from '../../../util/auth0/auth0-context';
import Resume from './Resume';
import { getResumeAction } from '../../store/resume/resume.action';

const ResumePage = () => {
  const dispatch = useDispatch();
  const { getToken } = useAuth0();

  useEffect(() => {
    const callResumeApi = async (cbResume, cbMessage) => {
      const token = await getToken();
      if (token) {
        getResumeAction(dispatch, 'kroy760@gmail.com', token);
      }
    };
    callResumeApi();
  }, [dispatch, getToken]);

  return (
    <Resume />
  );
};

export default ResumePage;
