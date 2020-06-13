// @flow

import React from 'react';
import { useSelector } from 'react-redux';

// import { useAuth0 } from '../../../util/auth0/auth0-context';
import Resume from './resume';
// import { getResumeAction } from '../../store/resume/resume.action';
import { getResume } from '../../store/resume/resume.selector';

const ResumePage = () => {
  // const { getToken } = useAuth0();
  const resume = useSelector(getResume);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const callResumeApi = async (cbResume, cbMessage) => {
  //     const token = await getToken();
  //     if (token) {
  //       getResumeAction(dispatch, 'kroy760@gmail.com', token);
  //     }
  //   };
  //   callResumeApi();
  // }, [dispatch, getToken]);

  return (
    <Resume resume={resume} />
  );
};

export default ResumePage;
