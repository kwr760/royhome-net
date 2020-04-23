// @flow

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';

import env from '../../../config';
import { useAuth0 } from '../../../util/auth0/context';
import Resume from './Resume';

const ResumePage = () => {
  const { getToken } = useAuth0();
  const [resume, setResume] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const callResumeApi = async (cbResume, cbMessage) => {
      const token = await getToken();
      const url = `${env.host}/api/resume`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get(url, options)
        .then((res) => {
          cbResume(res.data.resume);
        })
        .catch((error) => {
          cbMessage(error.message);
        });
    };
    if (isEmpty(resume)) {
      callResumeApi(setResume, setMessage);
    }
  }, [resume, getToken]);

  return (
    <>
      ( messaage &&
      <div>{ message }</div>
      )
      <Resume />
    </>
  );
};

export default ResumePage;
