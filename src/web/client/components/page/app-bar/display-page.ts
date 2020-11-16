import { shouldDisplayTab } from './should-display-tab';

import { TabPageType } from '../../../../types/pages.types';
import { UserStateType } from '../../../../types/state.types';

export const displayPage = (authenticated: boolean, user: UserStateType) => (page: TabPageType) => {
  if (page.role) {
    return (authenticated && shouldDisplayTab(authenticated, page.role, user));
  }

  if (page.authenticated) {
    return authenticated;
  }

  return true;
};
