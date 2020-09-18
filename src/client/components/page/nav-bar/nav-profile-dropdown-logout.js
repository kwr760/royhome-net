// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAuth0 } from '@src/util/auth0/auth0-context';

type Props = {|
  name: string,
  icon: string,
|}

const NavProfileDropDownLogout = ({ name, icon }: Props) => {
  const { logout } = useAuth0();
  return (
    <DropdownItem
      id="qsLogoutBtn"
      onClick={() => logout()}
    >
      <FontAwesomeIcon icon={icon} className="mr-3" />
      {name}
    </DropdownItem>
  );
};

NavProfileDropDownLogout.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default NavProfileDropDownLogout;
