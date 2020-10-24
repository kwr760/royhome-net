import React, { FunctionComponent } from 'react';
import { DropdownItem } from 'reactstrap';
import { FiLogOut } from 'react-icons/fi';

import { useAuth0 } from '../../../../util/auth0/auth0-context';

interface Props {
  name: string;
}

const NavProfileDropDownLogout: FunctionComponent<Props> = ({ name }) => {
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

export default NavProfileDropDownLogout;
