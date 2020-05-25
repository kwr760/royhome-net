
\echo Run Rollback/Clean Script
\echo

DROP TABLE login_auth0;

DROP TABLE resume_education;
DROP TABLE resume_summary;
DROP TABLE resume_address;
DROP TABLE resume_contact;
DROP TABLE resume_owner;

DROP SEQUENCE auth0_login_id_seq;
DROP SEQUENCE auth0_login_user_id_seq;
DROP SEQUENCE resume_owner_id_seq;
DROP SEQUENCE resume_address_id_seq;
DROP SEQUENCE resume_contact_id_seq;
DROP SEQUENCE resume_summary_id_seq;
DROP SEQUENCE resume_education_id_seq;

