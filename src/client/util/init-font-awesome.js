// @flow

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons/faUserAlt';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons/faSignInAlt';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons/faUserSecret';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLightbulb as fasLightbulb } from '@fortawesome/free-solid-svg-icons/faLightbulb';
import { faLightbulb as farLightbulb } from '@fortawesome/free-regular-svg-icons/faLightbulb';

function initFontAwesome() {
  library.add(faUserAlt);
  library.add(faPowerOff);
  library.add(faSignInAlt);
  library.add(faSignOutAlt);
  library.add(faGithub);
  library.add(faUserSecret);
  library.add(farLightbulb);
  library.add(fasLightbulb);
}

export default initFontAwesome;
