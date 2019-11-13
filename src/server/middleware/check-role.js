import { UNAUTHORIZED } from 'http-status-codes';

const checkRole = (neededRole) => (req, res, next) => {
  const { user = {} } = req;
  const { 'http://royhome.net': data = {} } = user;
  const { role: roleString = '' } = data;

  const grantedRoles = roleString.split(' ');
  if (roleString === 'owner') {
    grantedRoles.push('friend', 'engineer', 'family', 'company', 'admin');
  }
  if (grantedRoles.includes(neededRole)) {
    return next();
  }

  return res.sendStatus(UNAUTHORIZED);
};

export default checkRole;
