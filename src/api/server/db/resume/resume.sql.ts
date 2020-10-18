export const selectOwnerByUserIdSql = 'SELECT \
  id, user_id, name \
FROM \
  resume_owner \
WHERE \
  user_id = $1';

export const selectAddressByUserIdSql = 'SELECT \
  id, user_id, address \
FROM \
  resume_address \
WHERE \
  user_id = $1';

export const selectContactByUserIdSql = 'SELECT \
  id, user_id, phone, email, display_phone \
FROM \
  resume_contact \
WHERE \
  user_id = $1';

export const selectSummaryByUserIdSql = 'SELECT \
  id, user_id, summary \
FROM \
  resume_summary \
WHERE \
  user_id = $1';

export const selectEducationByUserIdSql = 'SELECT \
  id, user_id, degree, school, to_char(graduation_date, \'Month YYYY\') as graduation_date \
FROM \
  resume_education \
WHERE \
  user_id = $1';

export const selectSkillsByUserIdSql = 'SELECT \
  skill.id as skill_id, skill.position as skill_position, skill.name as skill_name, \
  item.id as item_id, item.position as item_position, item.item as item_name \
FROM resume_skill skill \
INNER JOIN resume_skill_item item \
ON skill.id = item.skill_id \
WHERE skill.user_id = $1 \
ORDER BY skill.position, item.position;';

export const selectExperienceByUserIdSql = 'SELECT \
  experience.id as experience_id, experience.position as experience_position, \
  experience.title as experience_title, experience.company as experience_company, \
  to_char(experience.start_date, \'Month YYYY\') as experience_start_date, \
  to_char(experience.end_date, \'Month YYYY\') as experience_end_date, \
  item.id as item_id, item.position as item_position, item.type as item_type, item.item as item_item \
FROM resume_experience experience \
INNER JOIN resume_experience_item item \
ON experience.id = item.experience_id \
WHERE experience.user_id = $1 \
ORDER BY experience.position, item.position;';
