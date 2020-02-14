import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';

import env from '../../../../config';

import { useAuth0 } from '../../../../util/auth0/context';

const getInitialData = (context) => get(context, 'data.private.body.message', '');

const Private = ({ context }) => {
  const { getTokenSilently } = useAuth0();
  const initialState = getInitialData(context);
  const [message, setMessage] = useState(initialState);

  useEffect(() => {
    const callPrivateApi = async (cb) => {
      const token = await getTokenSilently();
      const url = `${env.host}/api/private`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get(url, options)
        .then((res) => {
          cb(res.data.message);
        })
        .catch((error) => {
          const errorMessage = error.message || 'An unknown error included';
          cb(errorMessage);
        });
    };

    if (!message) {
      callPrivateApi(setMessage);
    }
  }, [message, getTokenSilently]);

  return <p>{ message }</p>;
};

Private.propTypes = {
  context: PropTypes.shape({
    data: PropTypes.shape(),
  }),
};

Private.defaultProps = {
  context: {},
};

export default Private;
