// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const ResumeHeader = () => (
  <Container>
    <Row>
      <Col>
        Address
      </Col>
      <Col>
        Owner
      </Col>
      <Col>
        Contact
      </Col>
    </Row>
  </Container>
);

export default ResumeHeader;


// <div className="header row">
//   <div className="col">
//     <div className="row">
//       <div id="address" className="col-sm-4 pull-left">Issaquah, WA 98027</div>
//       <div id="name" className="col-sm-4 text-center">Kevin Roy</div>
//       <div id="contact" className="col-sm-4 text-right">
//         <div id="phone">Cell upon request</div>
//         <div id="email"><a href="mailto:kroy760@gmaile.com?Subject=In%20response%20to%20your%20resume"
//                            target="_top">kroy760@gmail.com</a></div>
//       </div>
//     </div>
//   </div>
// </div>
