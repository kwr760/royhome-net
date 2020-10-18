import axios from 'axios';

import env from '../../../config';
import { ApiConfigs } from '../../client/store/api/api.contants';
import { getParsedUrl } from '../../client/util/url/get-parsed-url';

export const getResumeProxy = async (email: string): Promise<unknown> => {
  const config = ApiConfigs.GET_RESUME;
  const apiUrl = env.api.url;
  const action = {
    type: '',
    params: {
      email,
    },
    payload: {},
  };
  const url = getParsedUrl(config, action, apiUrl);

  const { data: { resume } } = await axios.get(url);

  return resume;
};
