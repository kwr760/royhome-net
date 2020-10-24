import axios from 'axios';

import env from '../../../config';
import { ApiConfigs } from '../../client/util/api/api.config';
import { getParsedUrl } from '../../client/util/api/get-parsed-url';

export const getResumeProxy = async (email: string): Promise<unknown> => {
  const config = ApiConfigs.GET_RESUME;
  const apiUrl = env.api.url;
  const params = {
    email,
  };
  const url = getParsedUrl(apiUrl, config.path, params);

  const { data: { resume } } = await axios.get(url);

  return resume;
};
