
\echo Run Rollback/Clean Script
\echo

DROP TABLE login_auth0;

DROP TABLE resume_education CASCADE;
DROP TABLE resume_experience_item CASCADE;
DROP TABLE resume_experience CASCADE;
DROP TABLE resume_skill_item CASCADE;
DROP TABLE resume_skill CASCADE;
DROP TABLE resume_summary CASCADE;
DROP TABLE resume_address CASCADE;
DROP TABLE resume_contact CASCADE;
DROP TABLE resume_owner CASCADE;

DROP SEQUENCE auth0_login_id_seq;
DROP SEQUENCE auth0_login_user_id_seq;
DROP SEQUENCE resume_owner_id_seq;
DROP SEQUENCE resume_address_id_seq;
DROP SEQUENCE resume_contact_id_seq;
DROP SEQUENCE resume_summary_id_seq;
DROP SEQUENCE resume_skill_id_seq;
DROP SEQUENCE resume_skill_item_id_seq;
DROP SEQUENCE resume_experience_id_seq;
DROP SEQUENCE resume_experience_item_id_seq;
DROP SEQUENCE resume_education_id_seq;
