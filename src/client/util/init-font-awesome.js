// @flow

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPowerOff, faUserAlt, faSignInAlt, faSignOutAlt, faUserSecret
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

function initFontAwesome() {
  library.add(faUserAlt);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faSignOutAlt);
  library.add(faGithub);
  library.add(faUserSecret);
}

export default initFontAwesome;
