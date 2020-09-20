// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownItem } from 'reactstrap';
import { FiLogOut } from 'react-icons/fi';

import { useAuth0 } from '@src/util/auth0/auth0-context';

type Props = {|
  name: string,
|}

const NavProfileDropDownLogout = ({ name }: Props) => {
  const { logout } = useAuth0();
  return (
    <DropdownItem
      id="qsLogoutBtn"
      onClick={() => logout()}
    >
      <FiLogOut className="mr-3" />
      {name}
    </DropdownItem>
  );
};

NavProfileDropDownLogout.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NavProfileDropDownLogout;
