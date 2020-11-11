import React, { FunctionComponent } from 'react';
import { Grid } from '@material-ui/core';

import './header.css';
import { AddressType, ContactType, OwnerType } from '../../../../../types/resume.types';

interface Props {
  owner: OwnerType;
  address: AddressType;
  contact: ContactType;
}
const ResumeHeader: FunctionComponent<Props> = ({ owner, address, contact }) => {
  const { name = '' } = owner;
  const { email = '', phone = '', displayPhone = false } = contact;
  const { address: location = '' } = address;
  return (
    <Grid container>
      <Grid item sm={4} className="name text-center order-0 order-sm-4">
        { name }
      </Grid>
      <Grid item sm={4} className="contact text-center order-4 order-sm-8 text-sm-right">
        <div>
          <a href="mailto:{ contact.email }?Subject=In%20response%20to%20your%20resume" target="_top">
            { email }
          </a>
        </div>
        <div className="phone">{ displayPhone ? phone : 'Cell upon request' }</div>
      </Grid>
      <Grid item sm={4} className="address text-center order-8 order-sm-0 text-sm-left">
        { location }
      </Grid>
    </Grid>
  );
};

export default ResumeHeader;
