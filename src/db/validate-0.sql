\pset tuples_only on

\echo Run Verification
\echo

SELECT
  'login_auth0',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM login_auth0;
SELECT
  'resume_owner',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_owner;
SELECT
  'resume_contact',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_contact;
SELECT
  'resume_address',
  CASE WHEN COUNT(*) = 1 THEN 'PASS' ELSE 'FAIL' END
FROM resume_address;

