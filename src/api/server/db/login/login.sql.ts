export const selectLoginByEmailSql = 'SELECT \
  id, user_id, email \
FROM \
  login_auth0 \
WHERE \
  email = $1';
