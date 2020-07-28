// @flow

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';

function initFontAwesome() {
  library.add(faUserAlt);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faSignOutAlt);
  library.add(faGithub);
  library.add(faUserSecret);
}

export default initFontAwesome;
