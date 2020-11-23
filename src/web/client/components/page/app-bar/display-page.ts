import { shouldDisplayTab } from './should-display-tab';

import { TabPageType } from '../../../../types/pages.types';
import { UserStateType } from '../../../../types/state.types';

export const displayPage = (authenticated: boolean, user: UserStateType) => (page: TabPageType): boolean => {
  if (page.role) {
    return shouldDisplayTab(authenticated, page.role, user);
  }

  if (page.authenticated) {
    return authenticated;
  }

  return true;
};
