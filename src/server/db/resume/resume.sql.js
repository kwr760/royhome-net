// @flow

export const selectOwnerByUserIdSql: string = 'SELECT \
  id, user_id, name \
FROM \
  resume_owner \
WHERE \
  user_id = $1';

export const selectAddressByUserIdSql: string = 'SELECT \
  id, user_id, address \
FROM \
  resume_address \
WHERE \
  user_id = $1';

export const selectContactByUserIdSql: string = 'SELECT \
  id, user_id, phone, email, display_phone \
FROM \
  resume_contact \
WHERE \
  user_id = $1';

export const selectSummaryByUserIdSql: string = 'SELECT \
  id, user_id, summary \
FROM \
  resume_summary \
WHERE \
  user_id = $1';

export const selectEducationByUserIdSql: string = 'SELECT \
  id, user_id, degree, school, to_char(graduation_date, \'Month YYYY\') as graduation_date \
FROM \
  resume_education \
WHERE \
  user_id = $1';
